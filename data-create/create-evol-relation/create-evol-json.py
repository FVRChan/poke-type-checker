import json
import requests
import time

root_url = "https://pokeapi.co/api/v2/evolution-chain?limit=3000"
res = json.loads(requests.get(root_url).text)
chain_list = list()
counter = 1
for r in res["results"]:
    chain_url = r["url"]
    chain_res = json.loads(requests.get(chain_url).text)
    time.sleep(0.5)
    chain_list.append(chain_res)
    if counter % 10 == 0:
        print(counter)
    counter += 1
writer = open("./tmp/evol.json", "w")
writer.write(json.dumps(chain_list))
writer.close()

# 進化関係のJSONをAPIから取得して保存する(加工は別スクリプトで)