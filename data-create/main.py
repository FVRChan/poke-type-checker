import dataclasses
from dataclasses import dataclass
from typing import List, Dict
import time
import requests
import json
from typing import Any
from datetime import date
import os

import waza
import form_mapping
import pokemon_type
import ability
import is_not_last_evolve_pokemon_id_list 
TYPE_ID_NORMAL = 1
TYPE_ID_FIGHTING = 2
TYPE_ID_FLYING = 3
TYPE_ID_POISON = 4
TYPE_ID_GROUND = 5
TYPE_ID_ROCK = 6
TYPE_ID_BUG = 7
TYPE_ID_GHOST = 8
TYPE_ID_STEEL = 9
TYPE_ID_FIRE = 10
TYPE_ID_WATER = 11
TYPE_ID_GRASS = 12
TYPE_ID_ELECTRIC = 13
TYPE_ID_PSYCHIC = 14
TYPE_ID_ICE = 15
TYPE_ID_DRAGON = 16
TYPE_ID_DARK = 17
TYPE_ID_FAIRY = 18


POKEMON_JSON_FILENAME="./tmp/pokemon.json"
ITEM_JSON_FILENAME="./tmp/item.json"
MOVE_JSON_FILENAME="./tmp/move.json"
ABILITY_JSON_FILENAME="./tmp/ability.json"
TYPE_JSON_FILENAME="./tmp/type.json"

pokemon_home_api_header = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    "content-type": "application/json",
    "countrycode": "304",
    "langcode": "1",
    'authorization': 'Bearer',
    'accept': 'application/json, text/javascript, */*; q=0.01',
}

# dataclass => JSONに使う関数(これを指定しないとシリアライズできない)
def default(item: Any):
    if type(item) == date:
        return {"__type__": "date", "args": (item.year, item.month, item.day)}
    elif dataclasses.is_dataclass(item):
        return dataclasses.asdict(item)



# @dataclass
# class PokemonAbility:
#     id: int
#     name_ja: str
#     name_en: str

#     is_scrappy: bool = False
#     is_tikaramoti: bool = False
#     is_katayaburi: bool = False
#     is_hardrock: bool = False
#     is_multi_slace: bool = False
#     is_tera_shell: bool = False
#     is_faily_skin: bool = False
#     is_sky_skin: bool = False
#     is_ereki_skin: bool = False
#     is_freeze_skin: bool = False
#     is_normal_skin    : bool = False
#     is_iromegane: bool = False
#     is_tennen: bool = False
#     is_harikiri: bool = False
#     is_tetunokobushi: bool = False
#     is_tekiourixyoku: bool = False
#     is_sunpower: bool = False
#     is_technician: bool = False
#     is_sutemi: bool = False
#     is_tikarazuku: bool = False
#     is_friendguard: bool = False
#     is_heavymetal: bool = False
#     is_lightmetal: bool = False
#     is_dokubousou: bool = False
#     is_netubousou: bool = False
#     is_analyze: bool = False
#     is_surinuke: bool = False
#     is_furcoar: bool = False
#     is_boudan: bool = False
#     is_ganzixyouago: bool = False
#     is_mega_launcher: bool = False
#     is_kusanokegawa: bool = False
#     is_kataitume: bool = False
#     is_punkrock: bool = False
#     is_koorinorinpun: bool = False
#     is_gorimutixyuu: bool = False
#     is_wazawainoutuwa: bool = False
#     is_wazawainoturugi: bool = False
#     is_wazawainoohuda: bool = False
#     is_wazawainoutama: bool = False
#     is_hihiironokodou: bool = False
#     is_hadoronengine: bool = False
#     is_kireazi: bool = False
#     is_soudaisixyou: bool = False

#     is_suihou:bool=False
#     is_taranzisuta:bool=False
#     is_iwahakobi:bool=False
#     is_ryunoagito:bool=False
#     is_haganetukai_haganenoseisin:bool=False
#     is_fairyaura:bool=False
#     is_darkaura:bool=False
#     is_sinryoku:bool=False
#     is_mouka:bool=False
#     is_gekiryu:bool=False
#     is_musinosirase:bool=False
#     is_sunanotikara:bool=False    

#     def set_extra_value(self):
#         # 受けるダメージ
#         if self.name_ja == "あついしぼう":
#             _=1
#         if self.name_ja == "ちくでん" or self.name_ja == "ひらいしん" or self.name_ja == "でんきエンジン":
#             _=1
#         if self.name_ja == "もらいび" or self.name_ja == "こんがりボディ":
#             _=1
#         if self.name_ja == "すいほう" or self.name_ja == "たいねつ":
#             _=1
#         if self.name_ja == "ちょすい" or self.name_ja == "よびみず":
#             _=1
#         if self.name_ja == "そうしょく":
#             _=1
#         if self.name_ja == "どしょく" or self.name_ja == "ふゆう":
#             _=1
#         if self.name_ja == "きよめのしお":
#             _=1
#         if self.name_ja == "かんそうはだ":
#             _=1

#         # 与えるダメージ
#         if self.name_ja == "すいほう":
#             self.is_suihou=True
#         if self.name_ja == "トランジスタ":
#             self.is_taranzisuta=True
#         if self.name_ja == "いわはこび":
#             self.is_iwahakobi=True
#         if self.name_ja == "りゅうのあぎと":
#             self.is_ryunoagito=True
#         if self.name_ja == "はがねつかい" or self.name_ja == "はがねのせいしん":
#             self.is_haganetukai_haganenoseisin=True
#         if self.name_ja == "フェアリーオーラ":
#             self.is_fairyaura=True
#         if self.name_ja == "ダークオーラ":
#             self.is_darkaura=True
#         if self.name_ja == "しんりょく":
#             self.is_sinryoku=True
#         if self.name_ja == "もうか":
#             self.is_mouka=True
#         if self.name_ja == "げきりゅう":
#             self.is_gekiryu=True
#         if self.name_ja == "むしのしらせ":
#             self.is_musinosirase=True
#         if self.name_ja == "すなのちから":
#             self.is_sunanotikara=True

#         # その他
#         if self.name_ja == "きもったま" or self.name_ja == "しんがん":
#             self.is_scrappy = True
#         if self.name_ja == "ちからもち" or self.name_ja == "ヨガパワー":
#             self.is_tikaramoti = True
#         if self.name_ja == "かたやぶり" or self.name_ja == "テラボルテージ" or self.name_ja == "ターボブレイズ":
#             self.is_katayaburi = True
#         if self.name_ja == "ハードロック" or self.name_ja == "プリズムアーマー" or self.name_ja == "フィルター":
#             self.is_hardrock = True
#         if self.name_ja == "マルチスケイル" or self.name_ja == "ファントムガード":
#             self.is_multi_slace = True
#         if self.name_ja == "テラスシェル":
#             self.is_tera_shell = True
#         if self.name_ja == "フェアリースキン":
#             self.is_faily_skin = True
#         if self.name_ja == "スカイスキン":
#             self.is_sky_skin = True
#         if self.name_ja == "エレキスキン":
#             self.is_ereki_skin = True
#         if self.name_ja == "フリーズスキン":
#             self.is_freeze_skin = True
#         if self.name_ja == "ノーマルスキン":
#             self.is_normal_skin = True
#         if self.name_ja == "いろめがね":
#             self.is_iromegane = True
#         if self.name_ja == "てんねん":
#             self.is_tennen = True
#         if self.name_ja in ["はりきり"]:
#             self.is_harikiri = True
#         if self.name_ja in ["てつのこぶし"]:
#             self.is_tetunokobushi = True
#         if self.name_ja in ["てきおうりょく"]:
#             self.is_tekiourixyoku = True
#         if self.name_ja in ["サンパワー"]:
#             self.is_sunpower = True
#         if self.name_ja in ["テクニシャン"]:
#             self.is_technician = True
#         if self.name_ja in ["すてみ"]:
#             self.is_sutemi = True
#         if self.name_ja in ["ちからずく"]:
#             self.is_tikarazuku = True
#         if self.name_ja in ["フレンドガード"]:
#             self.is_friendguard = True
#         if self.name_ja in ["ヘヴィメタル"]:
#             self.is_heavymetal = True
#         if self.name_ja in ["ライトメタル"]:
#             self.is_lightmetal = True
#         if self.name_ja in ["どくぼうそう"]:
#             self.is_dokubousou = True
#         if self.name_ja in ["ねつぼうそう"]:
#             self.is_netubousou = True
#         if self.name_ja in ["アナライズ"]:
#             self.is_analyze = True
#         if self.name_ja in ["すりぬけ"]:
#             self.is_surinuke = True
#         if self.name_ja in ["ファーコート"]:
#             self.is_furcoar = True
#         if self.name_ja in ["ぼうだん"]:
#             self.is_boudan = True
#         if self.name_ja in ["がんじょうあご"]:
#             self.is_ganzixyouago = True
#         if self.name_ja in ["メガランチャー"]:
#             self.is_mega_launcher = True
#         if self.name_ja in ["くさのけがわ"]:
#             self.is_kusanokegawa = True
#         if self.name_ja in ["かたいツメ"]:
#             self.is_kataitume = True
#         if self.name_ja in ["パンクロック"]:
#             self.is_punkrock = True
#         if self.name_ja in ["こおりのりんぷん"]:
#             self.is_koorinorinpun = True
#         if self.name_ja in ["ごりむちゅう"]:
#             self.is_gorimutixyuu = True
#         if self.name_ja in ["わざわいのうつわ"]:
#             self.is_wazawainoutuwa = True
#         if self.name_ja in ["わざわいのつるぎ"]:
#             self.is_wazawainoturugi = True
#         if self.name_ja in ["わざわいのおふだ"]:
#             self.is_wazawainoohuda = True
#         if self.name_ja in ["わざわいのたま"]:
#             self.is_wazawainoutama = True
#         if self.name_ja in ["ひひいろのこどう"]:
#             self.is_hihiironokodou = True
#         if self.name_ja in ["ハドロンエンジン"]:
#             self.is_hadoronengine = True
#         if self.name_ja in ["きれあじ"]:
#             self.is_kireazi = True
#         if self.name_ja in ["そうだいしょう"]:
#             self.is_soudaisixyou = True

@dataclass
class PokemonItem:
    id:int
    name_ja:str
    name_en:str
    picture_url:str

@dataclass
class PokemonPersonality:
    id:int
    name_ja:str
    name_en:str

@dataclass
class PokemonMove:
    id: int
    name_ja: str
    name_en: str
    type: int
    accuracy: int
    power: int
    damage_class_number:int
    is_renzoku: bool = False
    min_renzoku: int = 0
    max_renzoku: int = 0
    is_freeze_dry: bool = False
    is_hydro_steam: bool = False
    is_psy_blade: bool = False
    is_zidanda: bool = False
    is_punch: bool = False
    is_kiru:bool=False
    is_tama: bool = False
    is_hadou: bool = False
    is_kamituki: bool = False
    is_kaze: bool = False
    is_odori: bool = False
    is_oto: bool = False
    is_triple_kick_accelerator: bool = False
    is_sutemi_waza:bool=False
    is_heavy_slam: bool = False
    is_ketaguri: bool = False
    is_hatakiotosu: bool = False
    is_kishikaisei: bool = False
    is_karagenki: bool = False
    is_shiohuki: bool = False
    is_weather_ball: bool = False
    is_2x_under_condition: bool = False
    is_wring_out: bool = False
    is_stored_power: bool = False
    is_psyshock: bool = False
    is_electro_ball: bool = False
    is_body_press: bool = False
    is_ikasama: bool = False
    is_through_rank: bool = False
    is_ohakamairi: bool = False
    is_kakutei_critical: bool = False
    is_type_changeable: bool = False
    is_flying_press: bool = False
    is_zishin: bool = False
    is_katayaburi: bool = False
    is_wide_force: bool = False
    is_mist_burst: bool = False
    is_rising_bolt: bool = False
    is_waves_of_the_earth: bool = False
    is_kabehakai: bool = False
    is_batugun_sugoi: bool = False
    is_hundo: bool = False
    is_tutakon: bool = False

    def set_extra_value(self):
        if self.name_ja in waza.RENZOKU_WAZA_DICT:
            self.is_renzoku = True
            self.min_renzoku = waza.RENZOKU_WAZA_DICT[self.name_ja]["min"]
            self.max_renzoku = waza.RENZOKU_WAZA_DICT[self.name_ja]["max"]
        # https://wiki.xn--rckteqa2e.com/wiki/%E9%80%A3%E7%B6%9A%E6%94%BB%E6%92%83%E6%8A%80
        if self.name_ja == "フリーズドライ":
            self.is_freeze_dry = True
        if self.name_ja == "ハイドロスチーム":
            self.is_hydro_steam = True
        if self.name_ja == "サイコブレイド":
            self.is_psy_blade = True
        if self.name_ja == "じだんだ" or self.name_ja == "やけっぱち":
            self.is_zidanda = True
        if self.name_ja in waza.PUNCH_WAZA:
            self.is_punch = True
        if self.name_ja in waza.KIRU_WAZA:
            self.is_kiru = True
        if self.name_ja in waza.TAMA_WAZA:
            self.is_tama = True
        if self.name_ja in waza.HADOU_WAZA:
            self.is_hadou = True
        if self.name_ja in waza.KAMITUKI_WAZA:
            self.is_kamituki = True
        if self.name_ja in waza.KAZE_WAZA:
            self.is_kaze = True
        if self.name_ja in waza.ODORI_WAZA:
            self.is_odori = True
        if self.name_ja in waza.OTO_WAZA:
            self.is_oto = True
        if self.name_ja in waza.TRIPLE_WAZA:
            self.is_triple_kick_accelerator = True
        if self.name_ja in waza.SUTEMI_WAZA:
            self.is_sutemi_waza = True
        if self.name_ja in ["ヘビーボンバー", "ヒートスタンプ"]:
            self.is_heavy_slam = True
        if self.name_ja in ["けたぐり", "くさむすび"]:
            self.is_ketaguri = True
        if self.name_ja == "はたきおとす":
            self.is_hatakiotosu = True
        if self.name_ja in ["きしかいせい", "じたばた"]:
            self.is_kishikaisei = True
        if self.name_ja == "からげんき":
            self.is_karagenki = True
        if self.name_ja in ["しおふき", "ふんか"]:
            self.is_shiohuki = True
        if self.name_ja in ["ウェザーボール"]:
            self.is_weather_ball = True
        # 条件下で2倍
        if self.name_ja in ["アクロバット", "ベノムショック", "どくばりセンボン", "たたりめ", "しっぺがえし", "ゆきなだれ", "でんげきくちばし", "エラがみ", "うっぷんばらし"]:
            self.is_2x_under_condition = True
        if self.name_ja in ["しぼりとる", "にぎりつぶす", "ハードプレス"]:
            self.is_wring_out = True
        if self.name_ja in ["アシストパワー", "つけあがる"]:
            self.is_stored_power = True
        if self.name_ja in ["サイコショック", "サイコブレイク", "しんぴのつるぎ"]:
            self.is_psyshock = True
        if self.name_ja in ["エレキボール"]:
            self.is_electro_ball = True
        if self.name_ja in ["ボディプレス"]:
            self.is_body_press = True
        if self.name_ja in ["イカサマ"]:
            self.is_ikasama = True
        if self.name_ja in ["なしくずし", "せいなるつるぎ", "DDラリアット"]:
            self.is_through_rank = True
        if self.name_ja in ["おはかまいり"]:
            self.is_ohakamairi = True
        if self.name_ja in ["やまあらし", "こおりのいぶき", "ばちばちアクセル", "あんこくきょうだ", "すいりゅうれんだ", "トリックフラワー"]:
            self.is_kakutei_critical = True
        if self.name_ja in ["さばきのつぶて", "テクノバスター", "マルチアタック", "めざめるダンス"]:
            self.is_type_changeable = True
        if self.name_ja in ["フライングプレス"]:
            self.is_flying_press = True
        if self.name_ja in ["うちおとす", "サウザンアロー"]:
            self.is_flying_press = True
        if self.name_ja in ["じしん"]:
            self.is_zishin = True
        if self.name_ja in ["メテオドライブ", "シャドーレイ", "フォトンゲイザー",]:
            self.is_katayaburi = True
        if self.name_ja in ["ワイドフォース",]:
            self.is_wide_force = True
        if self.name_ja in ["ミストバースト",]:
            self.is_mist_burst = True
        if self.name_ja in ["ライジングボルト",]:
            self.is_rising_bolt = True
        if self.name_ja in ["だいちのはどう",]:
            self.is_waves_of_the_earth = True
        if self.name_ja in ["かわらわり", "サイコファング", "レイジングブル"]:
            self.is_kabehakai = True
        if self.name_ja in ["アクセルブレイク", "イナズマドライブ"]:
            self.is_batugun_sugoi = True
        if self.name_ja in ["ふんどのこぶし"]:
            self.is_hundo = True
        if self.name_ja in ["ツタこんぼう"]:
            self.is_tutakon = True


@dataclass
class Pokemon:
    id: int
    name_ja: str
    hp: int
    attack: int
    defense: int
    special_attack: int
    special_defense: int
    speed: int
    picture_url: str
    species_id: str
    weight: int
    type_id_list: List[int] = List
    ability_id_list: List[int] = List
    move_id_list: List[int] = List
    # ability_list: List[PokemonAbility] = List


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
    def get_rankmatch_season_detail_url(self):
        return 'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pokemon' % (self.id, self.rst, self.ts2)

    def set_usage_rank_list(self):
        res = requests.get(
            self.get_rankmatch_season_detail_url(),
            headers=pokemon_home_api_header,
        )
        usage_rank = json.loads(res.text)
        return usage_rank



def get_rankmatch_season_list() -> List[RankmatchSeason]:
    api_url = "https://api.battle.pokemon-home.com/tt/cbd/competition/rankmatch/list"
    data = {
        "soft": "Sc",
    }
    res = requests.post(api_url, data=json.dumps(data),
                        headers=pokemon_home_api_header)
    # print(json.loads(res.text))
    res_json = json.loads(res.text)
    # print(res_json)
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



def decode_pokemon(data: dict) -> Pokemon:
    return Pokemon(
        id=data["id"],
        name_ja=data["name_ja"],
        hp=data["hp"],
        attack=data["attack"],
        defense=data["defense"],
        special_attack=data["special_attack"],
        special_defense=data["special_defense"],
        speed=data["speed"],
        picture_url=data["picture_url"],
        species_id=data["species_id"],
        type_id_list=data["type_id_list"],
        ability_id_list=data["ability_id_list"],
        move_id_list=data["move_id_list"],
        weight=data["weight"],
        # ability_list=data["ability_list"],
    )


def decode_pokemon_type(data: dict) -> pokemon_type.PokemonType:
    return pokemon_type.PokemonType(
        id=data["id"],
        name_ja=data["name_ja"],
        name_en=data["name_en"],
    )


def decode_pokemon_move(data: dict) -> PokemonMove:
    return PokemonMove(
        id=data["id"],
        name_ja=data["name_ja"],
        name_en=data["name_en"],
        type=data["type"],
        accuracy=data["accuracy"],
        power=data["power"],
        damage_class_number=data["damage_class_number"],
        is_renzoku=data["is_renzoku"],
        min_renzoku=data["min_renzoku"],
        max_renzoku=data["max_renzoku"],
        is_freeze_dry=data["is_freeze_dry"],
        is_hydro_steam=data["is_hydro_steam"],
        is_psy_blade=data["is_psy_blade"],
        is_zidanda=data["is_zidanda"],
        is_punch=data["is_punch"],
        is_kiru=data["is_kiru"],
        is_tama=data["is_tama"],
        is_hadou=data["is_hadou"],
        is_kamituki=data["is_kamituki"],
        is_kaze=data["is_kaze"],
        is_odori=data["is_odori"],
        is_oto=data["is_oto"],
        is_triple_kick_accelerator=data["is_triple_kick_accelerator"],
        is_sutemi_waza=data["is_sutemi_waza"],
        is_heavy_slam=data["is_heavy_slam"],
        is_ketaguri=data["is_ketaguri"],
        is_hatakiotosu=data["is_hatakiotosu"],
        is_kishikaisei=data["is_kishikaisei"],
        is_karagenki=data["is_karagenki"],
        is_shiohuki=data["is_shiohuki"],
        is_weather_ball=data["is_weather_ball"],
        is_2x_under_condition=data["is_2x_under_condition"],
        is_wring_out=data["is_wring_out"],
        is_stored_power=data["is_stored_power"],
        is_psyshock=data["is_psyshock"],
        is_electro_ball=data["is_electro_ball"],
        is_body_press=data["is_body_press"],
        is_ikasama=data["is_ikasama"],
        is_through_rank=data["is_through_rank"],
        is_ohakamairi=data["is_ohakamairi"],
        is_kakutei_critical=data["is_kakutei_critical"],
        is_type_changeable=data["is_type_changeable"],
        is_flying_press=data["is_flying_press"],
        is_zishin=data["is_zishin"],
        is_katayaburi=data["is_katayaburi"],
        is_wide_force=data["is_wide_force"],
        is_mist_burst=data["is_mist_burst"],
        is_rising_bolt=data["is_rising_bolt"],
        is_waves_of_the_earth=data["is_waves_of_the_earth"],
        is_kabehakai=data["is_kabehakai"],
        is_batugun_sugoi=data["is_batugun_sugoi"],
        is_hundo=data["is_hundo"],
        is_tutakon=data["is_tutakon"],
    )


def get_pokemon_list():
    if os.path.exists(POKEMON_JSON_FILENAME):
        loaded_list = json.loads(
            open(POKEMON_JSON_FILENAME).read(), object_hook=decode_pokemon)
        return loaded_list
    print("download start get_pokemon_list")
    url = "https://pokeapi.co/api/v2/pokemon?limit=2000"
    res = json.loads(requests.get(url).text)
    results = res["results"]
    ret_list = list()
    for _, result in enumerate(results):
        try:
            detail_url = result["url"]
            detail_res = json.loads(requests.get(detail_url).text)
            time.sleep(0.1)
            species_url = detail_res["species"]["url"]
            species_res = json.loads(requests.get(species_url).text)
            species_id = species_res["id"]
            form_url = detail_res["forms"][0]["url"]
            form_res = json.loads(requests.get(form_url).text)
            form_name = ""
            if len(form_res["form_names"])>0:
                form_name = [form for form in form_res["form_names"] if form["language"]["name"]=="ja-Hrkt"]
                if form_name!=None and  len(form_name)>0:
                    form_name = form_name[0]["name"]
            time.sleep(0.2)
            name_ja = [n for n in species_res["names"]
                       if n["language"]["name"] == "ja-Hrkt"][0]["name"]
            hp = [s for s in detail_res["stats"] if s["stat"]
                  ["name"] == "hp"][0]["base_stat"]
            attack = [s for s in detail_res["stats"] if s["stat"]
                      ["name"] == "attack"][0]["base_stat"]
            defense = [s for s in detail_res["stats"]
                        if s["stat"]["name"] == "defense"][0]["base_stat"]
            special_attack = [s for s in detail_res["stats"]
                              if s["stat"]["name"] == "special-attack"][0]["base_stat"]
            special_defense = [s for s in detail_res["stats"]
                                if s["stat"]["name"] == "special-defense"][0]["base_stat"]
            speed = [s for s in detail_res["stats"] if s["stat"]
                     ["name"] == "speed"][0]["base_stat"]

            moves = [int(m["move"]["url"].split("/")[6])
                     for m in detail_res["moves"]]
            types = [int(m["type"]["url"].split("/")[6])
                     for m in detail_res["types"]]
            abilities = [int(m["ability"]["url"].split("/")[6])
                         for m in detail_res["abilities"]]

            picture_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%d.png" % detail_res[
                "id"]

            if form_name!="":
                name_ja="%s(%s)"%(name_ja,form_name)
            pokemon = Pokemon(
                id=detail_res["id"],
                name_ja=name_ja,
                hp=hp,
                attack=attack,
                defense=defense,
                special_attack=special_attack,
                special_defense=special_defense,
                speed=speed,
                picture_url=picture_url,
                species_id=species_id,
                weight=detail_res["weight"],
            )
            pokemon.move_id_list = moves
            pokemon.type_id_list = types
            pokemon.ability_id_list = abilities

            ret_list.append(pokemon)
            print("ok %s" % result["url"])
        except:
            print(result["url"])
            raise "wwww"

    writer = open(POKEMON_JSON_FILENAME, "w")
    writer.write(json.dumps(ret_list, default=default, ensure_ascii=False))
    writer.close()

def get_type_list():
    if os.path.exists(TYPE_JSON_FILENAME):
        loaded_list = json.loads(
            open(TYPE_JSON_FILENAME).read(), object_hook=decode_pokemon_type)
        return loaded_list
    print("download start get_type_list")
    url = "https://pokeapi.co/api/v2/type?limit=50"
    res = json.loads(requests.get(url).text)
    result_list = res["results"]
    type_list = list()
    for result in result_list:
        try:
            detail_url = result["url"]
            detail_res = json.loads(requests.get(detail_url).text)
            time.sleep(0.1)
            id = detail_res["id"]
            name_ja = [n for n in detail_res["names"]
                       if n["language"]["name"] == "ja"][0]["name"]
            name_en = [n for n in detail_res["names"]
                       if n["language"]["name"] == "en"][0]["name"]
            type_list.append(pokemon_type.PokemonType(
                id=id,
                name_ja=name_ja,
                name_en=name_en,

            ))
        except:
            _ = 1

    writer = open(TYPE_JSON_FILENAME, "w")
    writer.write(json.dumps(type_list, default=default, ensure_ascii=False))
    writer.close()


def get_ability_list():
    if os.path.exists(ABILITY_JSON_FILENAME):
        temp_list=json.loads(open(ABILITY_JSON_FILENAME).read())

        loaded_list=list()
        for temp_row in temp_list:
            # これだけ他みたいに読み込めなくて鬱
            tttt=ability.PokemonAbility(
                id=temp_row["id"],
                name_ja=temp_row["name_ja"],
                name_en=temp_row["name_en"],
                is_scrappy=temp_row["is_scrappy"],
                is_tikaramoti=temp_row["is_tikaramoti"],
                is_katayaburi=temp_row["is_katayaburi"],
                is_hardrock=temp_row["is_hardrock"],
                is_multi_slace=temp_row["is_multi_slace"],
                is_tera_shell=temp_row["is_tera_shell"],
                is_faily_skin=temp_row["is_faily_skin"],
                is_iromegane=temp_row["is_iromegane"],
                is_tennen=temp_row["is_tennen"],
                is_harikiri=temp_row["is_harikiri"],
                is_tetunokobushi=temp_row["is_tetunokobushi"],
                is_tekiourixyoku=temp_row["is_tekiourixyoku"],
                is_sunpower=temp_row["is_sunpower"],
                is_technician=temp_row["is_technician"],
                is_sutemi=temp_row["is_sutemi"],
                is_tikarazuku=temp_row["is_tikarazuku"],
                is_friendguard=temp_row["is_friendguard"],
                is_heavymetal=temp_row["is_heavymetal"],
                is_lightmetal=temp_row["is_lightmetal"],
                is_dokubousou=temp_row["is_dokubousou"],
                is_netubousou=temp_row["is_netubousou"],
                is_analyze=temp_row["is_analyze"],
                is_surinuke=temp_row["is_surinuke"],
                is_furcoar=temp_row["is_furcoar"],
                is_boudan=temp_row["is_boudan"],
                is_ganzixyouago=temp_row["is_ganzixyouago"],
                is_mega_launcher=temp_row["is_mega_launcher"],
                is_kusanokegawa=temp_row["is_kusanokegawa"],
                is_kataitume=temp_row["is_kataitume"],
                is_punkrock=temp_row["is_punkrock"],
                is_koorinorinpun=temp_row["is_koorinorinpun"],
                is_gorimutixyuu=temp_row["is_gorimutixyuu"],
                is_wazawainoutuwa=temp_row["is_wazawainoutuwa"],
                is_wazawainoturugi=temp_row["is_wazawainoturugi"],
                is_wazawainoohuda=temp_row["is_wazawainoohuda"],
                is_wazawainoutama=temp_row["is_wazawainoutama"],
                is_hihiironokodou=temp_row["is_hihiironokodou"],
                is_hadoronengine=temp_row["is_hadoronengine"],
                is_kireazi=temp_row["is_kireazi"],
                is_soudaisixyou=temp_row["is_soudaisixyou"],
            )
            loaded_list.append(tttt)
            # print(tttt)
        return loaded_list
    print("download start get_ability_list")
    url = "https://pokeapi.co/api/v2/ability?limit=500"
    res = json.loads(requests.get(url).text)
    result_list = res["results"]
    ability_list = list()
    for result in result_list:
        try:
            detail_url = result["url"]
            detail_res = json.loads(requests.get(detail_url).text)
            time.sleep(0.1)
            id = detail_res["id"]
            name_ja = [n for n in detail_res["names"]
                       if n["language"]["name"] == "ja"][0]["name"]
            name_en = [n for n in detail_res["names"]
                       if n["language"]["name"] == "en"][0]["name"]
            temp_ability = ability.PokemonAbility(
                id=id, name_ja=name_ja, name_en=name_en,
            )
            temp_ability.set_extra_value()
            ability_list.append(temp_ability)
        except:
            _ = 1

    writer = open(ABILITY_JSON_FILENAME, "w")
    writer.write(json.dumps(ability_list, default=default, ensure_ascii=False))
    writer.close()

def update_move_list():
    if os.path.exists(MOVE_JSON_FILENAME)==False:
        raise "file not found"
    reader_opener=open(MOVE_JSON_FILENAME)
    reader=reader_opener.read()
    # print(reader)
    move_list=json.loads(reader, object_hook=decode_pokemon_move)
    reader_opener.close()
    for move in move_list:
        move.set_extra_value()
    writer=open(MOVE_JSON_FILENAME,"w")
    writer.write(json.dumps(move_list, default=default, ensure_ascii=False))
    writer.close()


def get_move_list():
    if os.path.exists(MOVE_JSON_FILENAME):
        loaded_list = json.loads(
            open(MOVE_JSON_FILENAME).read(), object_hook=decode_pokemon_move)
        return loaded_list
    print("download start get_move_list")
    url = "https://pokeapi.co/api/v2/move?limit=1000"
    res = json.loads(requests.get(url).text)
    result_list = res["results"]
    move_list = list()
    for result in result_list:
        try:
            detail_url = result["url"]
            detail_res = json.loads(requests.get(detail_url).text)
            time.sleep(0.1)
            id = detail_res["id"]
            name_ja = [n for n in detail_res["names"]
                       if n["language"]["name"] == "ja"][0]["name"]
            name_en = [n for n in detail_res["names"]
                       if n["language"]["name"] == "en"][0]["name"]
            type = int(detail_res["type"]["url"].split("/")[6])
            accuracy = detail_res["accuracy"]
            power = detail_res["power"]
            damage_class=detail_res["damage_class"]["name"]
            damage_class_number=1
            if damage_class=="physical":
                damage_class_number=2
            elif damage_class=="special":
                damage_class_number=3
            temp_move = PokemonMove(
                id=id,
                name_ja=name_ja,
                name_en=name_en,
                type=type,
                accuracy=accuracy,
                power=power,
                damage_class_number=damage_class_number,
            )
            move_list.append(temp_move)
        except:
            _ = 1

    writer = open(MOVE_JSON_FILENAME, "w")
    writer.write(json.dumps(move_list, default=default, ensure_ascii=False))
    writer.close()

def get_item_list():
    if os.path.exists(ITEM_JSON_FILENAME):
        temp_list=json.loads(open(ITEM_JSON_FILENAME).read())
        ret_item_list=list()
        for temp in temp_list:
            ret_item_list.append(PokemonItem(
                id=temp["id"],
                name_ja=temp["name_ja"],
                name_en=temp["name_en"],
                picture_url=temp["picture_url"],
            ))
        return ret_item_list
    print("download start get_item_list")
    url = "https://pokeapi.co/api/v2/item?limit=2500"
    res = json.loads(requests.get(url).text)
    result_list = res["results"]
    move_list = list()
    for result in result_list:
        try:
            detail_url = result["url"]
            detail_res = json.loads(requests.get(detail_url).text)
            time.sleep(0.1)
            id = detail_res["id"]
            name_ja = [n for n in detail_res["names"]
                       if n["language"]["name"] == "ja"][0]["name"]
            name_en = [n for n in detail_res["names"]
                       if n["language"]["name"] == "en"][0]["name"]
            picture_url=detail_res["sprites"]["default"]
            temp_move = PokemonItem(
                id=id,
                name_ja=name_ja,
                name_en=name_en,
                picture_url=picture_url,
            )
            move_list.append(temp_move)
        except:
            _ = 1

    writer = open(ITEM_JSON_FILENAME, "w")
    writer.write(json.dumps(move_list, default=default, ensure_ascii=False))
    writer.close()


def get_season_detail_info():
    if os.path.exists("./tmp/single_season_info.json"):
        return json.loads(open("./tmp/single_season_info.json").read())
    single_season_list=get_rankmatch_season_list()
    ret_dict=dict()
    for single_season in single_season_list:
        detail_dict=dict()
        for x in (1,7):
            season_detail_url = 'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,x)
            try:
                detail_res=json.loads(requests.get(season_detail_url).text)
                time.sleep(0.25)
                for key,value in detail_res.items():
                    detail_dict[int(key)]=value
            except:
                1
        ret_dict[single_season.season]=detail_dict
    writer = open("./tmp/single_season_info.json", "w")
    writer.write(json.dumps(ret_dict, default=default, ensure_ascii=False))
    writer.close()

    return ret_dict


def get_personality_list():
    if os.path.exists("./tmp/personality.json"):
        temp_list=json.loads(open("./tmp/personality.json").read())
        ret_item_list=list()
        for temp in temp_list:
            ret_item_list.append(PokemonPersonality(
                id=temp["id"],
                name_ja=temp["name_ja"],
                name_en=temp["name_en"],
            ))
        return ret_item_list
    url = "https://pokeapi.co/api/v2/nature?limit=33"
    res = json.loads(requests.get(url).text)
    result_list = res["results"]
    ret_list = list()
    for result in result_list:
        try:
            detail_url = result["url"]
            detail_res = json.loads(requests.get(detail_url).text)
            time.sleep(0.1)
            id = detail_res["id"]
            name_ja = [n for n in detail_res["names"]
                       if n["language"]["name"] == "ja"][0]["name"]
            name_en = [n for n in detail_res["names"]
                       if n["language"]["name"] == "en"][0]["name"]
            temp_move = PokemonPersonality(
                id=id,
                name_ja=name_ja,
                name_en=name_en,
            )
            ret_list.append(temp_move)
        except:
            _ = 1

    writer = open("./tmp/personality.json", "w")
    writer.write(json.dumps(ret_list, default=default, ensure_ascii=False))
    writer.close()






@dataclass
class PokemonForRankMatch:
    id:int
    name_ja: str
    hp: int
    attack: int
    defense: int
    special_attack: int
    special_defense: int
    speed: int
    picture_url: str
    species_id: str
    weight: int
    usage_rate:int=999
    is_not_last_evolve:bool=False
    often_used_move:List[int]= List
    often_used_tokusei:List[int]= List
    type_id_list: List[int] = List
    ability_id_list: List[int] = List
    move_id_list: List[int] = List



def update_pokemon_data():
    pokemon_list=get_pokemon_list()
    single_season_list=get_rankmatch_season_list()

    for single_season in single_season_list:
        usage_info_list=single_season.set_usage_rank_list()
        ### 使用率TOP150抽出
        usage_rate_mapper=dict()
        loop_usage_rate=1
        # 使用率は後で
        # 後で使用率圏外のポケモンも補完する
        for usage_info in usage_info_list:
            pokemon=[p for p in pokemon_list if p.id==usage_info["id"]]
            if len(pokemon)==0:
                raise "kusa"
            pokemon=pokemon[0]
            pokemon_id=form_mapping.form_mapping(int(usage_info["id"]),int(usage_info["form"]))
            usage_rate_mapper[pokemon_id]=loop_usage_rate
            if pokemon_id==964: # イルカマン
                usage_rate_mapper[10256]=loop_usage_rate
            elif pokemon_id==1017: # オーガポン
                usage_rate_mapper[10273]=loop_usage_rate
                usage_rate_mapper[10274]=loop_usage_rate
                usage_rate_mapper[10275]=loop_usage_rate
            elif pokemon_id==1024: # テラパゴス
                usage_rate_mapper[10276]=loop_usage_rate
                usage_rate_mapper[10277]=loop_usage_rate

            loop_usage_rate+=1
        # ###
        # print(usage_rate_mapper)
        # raise 1
        poke_detail_url_list = [
            'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,1),
            'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,2),
            'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,3),
            'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,4),
            'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,5),
            'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,6),
        ]

        #
        detail_mapper=dict()
        detail_list=list()
        # rank_list=list()
        for poke_detail_url in poke_detail_url_list:
            res=requests.get(poke_detail_url,headers=pokemon_home_api_header)
            time.sleep(1)
            res_dict=json.loads(res.text)
            for pokemon_number in res_dict.keys():
                for pokemon_form in res_dict[pokemon_number].keys():
                    usage_info=res_dict[pokemon_number][pokemon_form]
                    often_usage_move_list=[int(move["id"]) for move in usage_info["temoti"]["waza"]]
                    often_usage_tokusei_list=[int(move["id"]) for move in usage_info["temoti"]["tokusei"]]
                    pokemon_id_list=[form_mapping.form_mapping(pokemon_id=int(pokemon_number),form_number=int(pokemon_form))]
                    if len(pokemon_id_list)==1 :
                        if pokemon_id_list[0]==964:
                            pokemon_id_list.append(10256)
                        elif pokemon_id_list[0]==1017:
                            pokemon_id_list.append(10273,10274,10275)
                        elif pokemon_id_list[0]==1024:
                            pokemon_id_list.append(10276,10277)

                    for pokemon_id in pokemon_id_list:
                        pokemon=[p for p in pokemon_list if int(p.id)==int(pokemon_id)]
                        temp_info=PokemonForRankMatch(
                            id=int(pokemon_id),
                            often_used_move=often_usage_move_list,
                            often_used_tokusei=often_usage_tokusei_list,
                            name_ja=pokemon[0].name_ja,
                            hp=pokemon[0].hp,
                            attack=pokemon[0].attack,
                            defense=pokemon[0].defense,
                            special_attack=pokemon[0].special_attack,
                            special_defense=pokemon[0].special_defense,
                            speed=pokemon[0].speed,
                            picture_url=pokemon[0].picture_url,
                            species_id=pokemon[0].species_id,
                            weight=pokemon[0].weight,
                            type_id_list=pokemon[0].type_id_list,
                            ability_id_list=pokemon[0].ability_id_list,
                            move_id_list=pokemon[0].move_id_list,
                        )
                        if pokemon_id in usage_rate_mapper:
                            temp_info.usage_rate=usage_rate_mapper[pokemon_id]
                        if int(pokemon_id) in usage_rate_mapper:
                            temp_info.usage_rate=usage_rate_mapper[int(pokemon_id)]
                        if int(pokemon_id) in is_not_last_evolve_pokemon_id_list.is_not_last_evolve_pokemon_id_list:
                            temp_info.is_not_last_evolve=True
                        if pokemon_id not in detail_mapper:
                            detail_mapper[pokemon_id]=temp_info
                            detail_list.append(temp_info)

        takashi=open("./poke-js/src/pokemon-list.ts","w")
        takashi.write('import { Pokemon } from "./pokemon";export const all_pokemon_list ='+json.dumps(detail_list, default=default, ensure_ascii=False)+' as Array<Pokemon>;')
        takashi.close()
        break

# update_pokemon_data()
# def update_pokemon_list():
#     if os.path.exists(POKEMON_JSON_FILENAME)==False:
#         raise "file not found"
#     reader_opener=open(POKEMON_JSON_FILENAME)
#     reader=reader_opener.read()
#     # print(reader)
#     pokemon_list=json.loads(reader, object_hook=decode_pokemon)
#     reader_opener.close()
#     ability_list=get_ability_list()
#     for pokemon in pokemon_list:
#         pokemon_ability_list=list()
#         for ability_id in pokemon.ability_id_list:
#             for ability in [a for a in ability_list if a.id == ability_id]:
#                 pokemon_ability_list.append(ability)
#         pokemon.ability_list=pokemon_ability_list

#     writer=open(POKEMON_JSON_FILENAME,"w")
#     writer.write(json.dumps(pokemon_list, default=default, ensure_ascii=False))
#     writer.close()

# update_pokemon_list()

get_ability_list()
# update_pokemon_data()
# get_move_list()
# update_move_list()