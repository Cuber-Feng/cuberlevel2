from update import download_file
from unzip import unzip_file
from gen import generate_rank_summary
from editmeta import update_metadata

if __name__ == "__main__":
    download_file(url="https://www.worldcubeassociation.org/export/results/v2/tsv")
    unzip_file(zip_path="wca_export.zip", output_dir="data")
    generate_rank_summary()
    update_metadata()