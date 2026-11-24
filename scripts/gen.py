import pandas as pd
import myHelper
import time

def generate_rank_summary():
    df_average = pd.read_csv('./data/WCA_export_ranks_average.tsv', sep='\t', encoding='utf-8', dtype={2: str})
    df_single = pd.read_csv('./data/WCA_export_ranks_single.tsv', sep='\t', encoding='utf-8', dtype={2: str})
    # df_person = pd.read_csv('../data/WCA_export_persons.tsv', sep='\t', encoding='utf-8')

    start_time = time.time()
    myHelper.makeFile(df_average, df_single)
    end_time = time.time()
    print(f"Running Time: {end_time - start_time:.2f} seconds")

if __name__ == "__main__":
    generate_rank_summary()