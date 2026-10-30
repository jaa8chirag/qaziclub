#!/usr/bin/env python3
"""
Qazi Club - One-Command Terminal cPanel Deployment Script
Supports both FTP (built-in, works on all cPanels) and SSH/SCP.
"""

import os
import sys
import getpass
import ftplib
import subprocess
from pathlib import Path

def print_banner():
    print("=" * 60)
    print("   QAZI CLUB — TERMINAL CPANEL DEPLOYER")
    print("=" * 60)

def deploy_via_ftp(host, port, user, password, remote_dir):
    print(f"\n[+] Connecting to FTP server {host}:{port}...")
    ftp = ftplib.FTP()
    ftp.connect(host, port, timeout=30)
    ftp.login(user, password)
    print("[+] FTP Login successful!")

    # Navigate or create remote directories
    def ensure_remote_dir(path):
        parts = path.strip("/").split("/")
        current = ""
        for p in parts:
            current += "/" + p
            try:
                ftp.cwd(current)
            except ftplib.error_perm:
                try:
                    ftp.mkd(current)
                    ftp.cwd(current)
                except Exception as e:
                    pass

    ensure_remote_dir(remote_dir)
    print(f"[+] Active remote directory: {remote_dir}")

    local_dir = Path("out")
    if not local_dir.exists():
        print("[-] 'out' directory not found! Running build first...")
        subprocess.run(["npm", "run", "build"], shell=True, check=True)

    files_to_upload = []
    for root, dirs, files in os.walk(local_dir):
        for f in files:
            full_path = Path(root) / f
            rel_path = full_path.relative_to(local_dir)
            files_to_upload.append((full_path, rel_path))

    # Also upload .htaccess if present
    htaccess = Path("public/.htaccess")
    if htaccess.exists():
        files_to_upload.append((htaccess, Path(".htaccess")))

    total = len(files_to_upload)
    print(f"[+] Found {total} files to upload. Starting transfer...\n")

    for i, (local_file, rel_file) in enumerate(files_to_upload, 1):
        rel_str = str(rel_file).replace("\\", "/")
        remote_file_path = f"{remote_dir.rstrip('/')}/{rel_str}"
        parent_dir = "/".join(remote_file_path.split("/")[:-1])
        
        ensure_remote_dir(parent_dir)
        filename = rel_file.name

        with open(local_file, "rb") as fp:
            ftp.storbinary(f"STOR {filename}", fp)
        print(f"[{i}/{total}] Uploaded: {rel_str}")

    ftp.quit()
    print("\n" + "=" * 60)
    print(" [✓] DEPLOYMENT COMPLETE! Website is now LIVE on your cPanel!")
    print("=" * 60)

def deploy_via_ssh(host, port, user, remote_dir):
    zip_file = "qaziclub-live-cpanel.zip"
    if not os.path.exists(zip_file):
        print("[-] Zip file not found. Creating zip...")
        subprocess.run(["npm", "run", "build"], shell=True, check=True)
        subprocess.run(["powershell", "-Command", "Compress-Archive -Path out/*, out/.htaccess -DestinationPath qaziclub-live-cpanel.zip -Force"], shell=True, check=True)

    print(f"\n[+] Uploading {zip_file} to {user}@{host}:{remote_dir} via SCP...")
    scp_cmd = f'scp -P {port} "{zip_file}" "{user}@{host}:{remote_dir}/"'
    print(f"Executing: {scp_cmd}")
    res = subprocess.run(scp_cmd, shell=True)
    if res.returncode != 0:
        print("[-] SCP upload failed.")
        return

    print("\n[+] Extracting zip file on remote server via SSH...")
    ssh_cmd = f'ssh -p {port} {user}@{host} "cd {remote_dir} && unzip -o {zip_file} && rm {zip_file}"'
    print(f"Executing: {ssh_cmd}")
    res_ssh = subprocess.run(ssh_cmd, shell=True)
    if res_ssh.returncode == 0:
        print("\n" + "=" * 60)
        print(" [✓] DEPLOYMENT COMPLETE! Website is now LIVE on your cPanel!")
        print("=" * 60)
    else:
        print("[-] Extraction via SSH failed. Please check permissions.")

def main():
    print_banner()
    print("Choose deployment protocol:")
    print(" 1) FTP / FTPS (Recommended - Works on all shared cPanels without SSH setup)")
    print(" 2) SSH / SCP (Requires SSH Terminal access enabled in cPanel)")
    
    choice = input("\nEnter choice (1 or 2) [default: 1]: ").strip() or "1"
    
    if choice == "1":
        host = input("Enter FTP Host (e.g. ftp.yourdomain.com or server IP): ").strip()
        port = int(input("Enter FTP Port [default: 21]: ").strip() or "21")
        user = input("Enter cPanel / FTP Username: ").strip()
        password = getpass.getpass("Enter FTP Password: ")
        remote_dir = input("Enter Remote Target Directory (e.g. /public_html/qaziclub or /public_html): ").strip()
        deploy_via_ftp(host, port, user, password, remote_dir)
    elif choice == "2":
        host = input("Enter SSH Host (server IP or domain): ").strip()
        port = int(input("Enter SSH Port [default: 22]: ").strip() or "22")
        user = input("Enter SSH / cPanel Username: ").strip()
        remote_dir = input("Enter Remote Target Directory (e.g. /home/USER/public_html/qaziclub): ").strip()
        deploy_via_ssh(host, port, user, remote_dir)
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()

