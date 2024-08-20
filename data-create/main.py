from dataclasses import dataclass

from typing import List

import requests
import json

pokemon_home_api_header = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    "content-type": "application/json",
    "countrycode": "304",
    "langcode": "1",
    'authorization': 'Bearer',
    'accept': 'application/json, text/javascript, */*; q=0.01',
}


@dataclass
class Pokemon:
    id: int
    form: int
    index: int


@dataclass
class RankmatchSeason:
    id: str
    name: str
    season: int
    is_single: bool
    in_double: bool
    rst: int
    ts1: int
    ts2: int

    # シーズンごとの情報を取得するためのURL作成
    def create_rankmatch_season_detail_url(self):
        return 'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pokemon' % (self.id, self.rst, self.ts2)

    # シーズンごとの情報を使用率順位を取得して保存
    def set_usage_rank_list(self):
        res = requests.get(
            self.create_rankmatch_season_detail_url(),
            headers=pokemon_home_api_header,
        )
        usage_rank = json.loads(res.text)
        temp_list = list()
        for i, usage in enumerate(usage_rank):
            temp_list.append(Pokemon(
                usage["id"], usage["form"], i+1
            ))
        self.usage_rank_list = temp_list


def create_rankmatch_season_list() -> List[RankmatchSeason]:
    api_url = "https://api.battle.pokemon-home.com/tt/cbd/competition/rankmatch/list"
    data = {
        "soft": "Sc",
    }
    res = requests.post(api_url, data=json.dumps(data),
                        headers=pokemon_home_api_header)
    # print(json.loads(res.text))
    res_json = json.loads(res.text)
    print(res_json)
    single_season_list, double_season_list = list(), list()
    for key1 in res_json["list"]:
        for key2 in res_json["list"][key1]:
            season_info = res_json["list"][key1][key2]
            if season_info["rule"] == 0:
                single_season_list.append(RankmatchSeason(
                    season_info["cId"],
                    season_info["name"],
                    season_info["season"],
                    True,
                    False,
                    season_info["rst"],
                    season_info["ts1"],
                    season_info["ts2"]
                ))
            elif season_info["rule"] == 1:
                double_season_list.append(RankmatchSeason(
                    season_info["cId"],
                    season_info["name"],
                    season_info["season"],
                    False,
                    True,
                    season_info["rst"],
                    season_info["ts1"],
                    season_info["ts2"]
                ))
    return single_season_list


single_season_list = create_rankmatch_season_list()
