import zipfile

zip_path = "wca_export.zip"
output_dir = "data"

with zipfile.ZipFile(zip_path, "r") as zip_ref:
    zip_ref.extractall(output_dir)