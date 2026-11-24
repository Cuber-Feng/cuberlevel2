import json

def update_metadata():
    with open("./data/metadata.json", "r", encoding="utf-8") as f:
        source = json.load(f)

    with open("./public/metadata.json", "r", encoding="utf-8") as f:
        target = json.load(f)

    target["export_date"] = source["export_date"]

    with open("./public/metadata.json", "w", encoding="utf-8") as f:
        json.dump(target, f, indent=4, ensure_ascii=False)

    print(f"metadata.json updated successfully. export_date: {source['export_date']}")

if __name__ == "__main__":
    update_metadata()