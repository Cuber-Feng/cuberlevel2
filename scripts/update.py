import requests
from pathlib import Path

url = "https://www.worldcubeassociation.org/export/results/v2/tsv"

response = requests.get(url, stream=True)
response.raise_for_status()

total = int(response.headers.get("content-length", 0))
downloaded = 0

with open("wca_export.zip", "wb") as f:
    for chunk in response.iter_content(chunk_size=1024 * 1024):
        if chunk:
            f.write(chunk)
            downloaded += len(chunk)

            if total:
                percent = downloaded / total * 100
                print(f"\rDownloaded: {percent:.2f}%", end="", flush=True)

print("\nDownload complete!")