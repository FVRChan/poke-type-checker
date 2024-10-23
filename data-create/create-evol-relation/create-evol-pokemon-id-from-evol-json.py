import json

# 進化関係のJSONからしんかのきせき適用ポケモンのIDを得る

def process_chain_evolves(chain: dict):
    chain["is_last_evol"] = 0
    if len(chain["evolves_to"]) == 0:
        chain["is_last_evol"] = 1
    ret_list = [chain]
    for sub_chain in chain["evolves_to"]:
        temp_list = process_chain_evolves(sub_chain)
        ret_list = ret_list+temp_list
    return ret_list


#
reader_list = json.loads(open("./tmp/evol.json").read())

# リージョンフォームだけ進化するパターン
# ハリーセン 211=>10234
# サニーゴ   222=>10173
# バリヤード 122=>10168
# カモネギ   83=>10166
regional_dict = {
    211: 10234,
    222: 10173,
    122: 10168,
    83: 10166,
}
res_list = []
for row in reader_list:
    chain = row["chain"]
    chain_list = process_chain_evolves(chain=chain)
    chain_list = [{"species_id": int(chain["species"]["url"].split(
        "/")[6]), "is_last_evol": chain["is_last_evol"]} for chain in chain_list]
    for chain in chain_list:
        if chain["species_id"] in regional_dict:
            chain["species_id"] = regional_dict[chain["species_id"]]
    res_list += chain_list
res_list = [res["species_id"]
            for res in res_list if res["is_last_evol"] == 0]

# ↑で表示した奴を is_not_last_evolve_pokemon_id_list.py に移す