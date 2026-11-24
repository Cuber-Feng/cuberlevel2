# Cuber Level 2

> This is an advanced application of cuberlevel. The previous one was developed by pure `HTML+CSS+JS`, and this one is by `node.js`. And with the help of `GitHub Action`, we can update the database everyday automatically.

## Update the data from WCA API

run `update.py`, `unzip.py`, `gen.py`

later try:

```python
import subprocess
import sys

for file in ["step1.py", "step2.py", "step3.py"]:
    subprocess.run([sys.executable, file], check=True)
```
