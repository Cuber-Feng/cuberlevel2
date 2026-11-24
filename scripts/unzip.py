import zipfile

def unzip_file(zip_path="wca_export.zip", output_dir="data"):
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(output_dir)

if __name__ == "__main__":
    unzip_file()