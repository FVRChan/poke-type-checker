import dataclasses
from dataclasses import dataclass
from typing import List, Dict
import time
import requests
import json
from typing import Any
from datetime import date

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

MOVE_RENZOKU_DICT = {
    "ダブルニードル": {"min": 2, "max": 2},
    "にどげり": {"min": 2, "max": 2},
    "ホネブーメラン": {"min": 2, "max": 2},
    "ダブルアタック": {"min": 2, "max": 2},
    "ギアソーサー": {"min": 2, "max": 2},
    "ダブルチョップ": {"min": 2, "max": 2},
    "ダブルパンツァー": {"min": 2, "max": 2},
    "ドラゴンアロー": {"min": 2, "max": 2},
    "ダブルウイング": {"min": 2, "max": 2},
    "タキオンカッター": {"min": 2, "max": 2},
    "ツインビーム": {"min": 2, "max": 2},
    "すいりゅうれんだ": {"min": 3, "max": 3},
    "トリプルダイブ": {"min": 3, "max": 3},
    "おうふくビンタ": {"min": 2, "max": 5},
    "たまなげ": {"min": 2, "max": 5},
    "とげキャノン": {"min": 2, "max": 5},
    "ミサイルばり": {"min": 2, "max": 5},
    "みだれづき": {"min": 2, "max": 5},
    "みだれひっかき": {"min": 2, "max": 5},
    "れんぞくパンチ": {"min": 2, "max": 5},
    "ボーンラッシュ": {"min": 2, "max": 5},
    "タネマシンガン": {"min": 2, "max": 5},
    "つっぱり": {"min": 2, "max": 5},
    "つららばり": {"min": 2, "max": 5},
    "ロックブラスト": {"min": 2, "max": 5},
    "スイープビンタ": {"min": 2, "max": 5},
    "みずしゅりけん": {"min": 2, "max": 5},
    "スケイルショット": {"min": 2, "max": 5},
    "トリプルキック": {"min": 1, "max": 3},
    "トリプルアクセル": {"min": 1, "max": 3},
    "ネズミざん": {"min": 1, "max": 10},
}
PUNCH_WAZA = ["アームハンマー",
              "アイスハンマー",
              "あんこくきょうだ",
              "かみなりパンチ",
              "きあいパンチ",
              "グロウパンチ",
              "コメットパンチ",
              "ジェットパンチ",
              "シャドーパンチ",
              "すいりゅうれんだ",
              "スカイアッパー",
              "ダブルパンツァー",
              "ドレインパンチ",
              "ばくれつパンチ",
              "バレットパンチ",
              "ピヨピヨパンチ",
              "ぶちかまし",
              "プラズマフィスト",
              "ふんどのこぶし",
              "ほのおのパンチ",
              "マッハパンチ",
              "メガトンパンチ",
              "れいとうパンチ",
              "れんぞくパンチ",]
TAMA_WAZA = ["アイスボール"
             "アシッドボム"
             "ウェザーボール"
             "エナジーボール"
             "エレキボール"
             "オクタンほう"
             "かえんだん"
             "かえんボール"
             "かふんだんご"
             "がんせきほう"
             "きあいだま"
             "くちばしキャノン"
             "ジャイロボール"
             "シャドーボール"
             "タネばくだん"
             "タネマシンガン"
             "タマゴばくだん"
             "たまなげ"
             "でんじほう"
             "どろばくだん"
             "はどうだん"
             "ヘドロばくだん"
             "マグネットボム"
             "みずあめボム"
             "ミストボール"
             "ロックブラスト"]
HADOU_WAZA = [
    "あくのはどう",
    "いやしのはどう",
    "こんげんのはどう",
    "だいちのはどう",
    "はどうだん",
    "みずのはどう",
    "りゅうのはどう",
]
KAMITUKI_WAZA = [
    "エラがみ",
    "かみくだく",
    "かみつく",
    "かみなりのキバ",
    "くらいつく",
    "こおりのキバ",
    "サイコファング",
    "どくどくのキバ",
    "ひっさつまえば",
    "ほのおのキバ",
]
KAZE_WAZA = [
    "エアカッター",
    "エアロブラスト",
    "おいかぜ",
    "かぜおこし",
    "かみなりあらし",
    "こがらしあらし",
    "こごえるかぜ",
    "すなあらし",
    "たつまき",
    "ねっさのあらし",
    "ねっぷう",
    "はなふぶき",
    "はるのあらし",
    "ふきとばし",
    "ふぶき",
    "ぼうふう",
    "ようせいのかぜ",
]
ODORI_WAZA = [
    "アクアステップ",
    "しょうりのまい",
    "ソウルビート",
    "ちょうのまい",
    "つるぎのまい",
    "はなびらのまい",
    "フェザーダンス",
    "フラフラダンス",
    "ほのおのまい",
    "みかづきのまい",
    "めざめるダンス",
    "りゅうのまい",
]
OTO_WAZA = [
    "いにしえのうた",
    "いびき",
    "いやしのすず",
    "いやなおと",
    "うたう",
    "うたかたのアリア",
    "エコーボイス",
    "オーバードライブ",
    "おしゃべり",
    "おたけび",
    "きんぞくおん",
    "くさぶえ",
    "サイコノイズ",
    "さわぐ",
    "スケイルノイズ",
    "すてゼリフ",
    "ソウルビート",
    "ダークパニック",
    "チャームボイス",
    "ちょうおんぱ",
    "とおぼえ",
    "ないしょばなし",
    "なきごえ",
    "バークアウト",
    "ハイパーボイス",
    "ばくおんぱ",
    "ぶきみなじゅもん",
    "フレアソング",
    "ブレイジングソウルビート",
    "ほえる",
    "ほろびのうた",
    "みわくのボイス",
    "むしのさざめき",
    "りんしょう",
]
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


@dataclass
class PokemonType:
    id: int
    name_ja: str
    name_en: str


@dataclass
class PokemonAbility:
    id: int
    name_ja: str
    name_en: str
    # 特性で受けるダメージ半減
    half_type_id_list: List[int] = List
    # 特性で受けるダメージ無効化
    no_damage_type_id_list: List[int] = List
    # # きもったま/しんがん
    is_scrappy: bool = False
    # # ちからもち/ヨガパワー
    is_tikaramoti: bool = False
    # # かたやぶり/テラボルテージ/ターボブレイズ
    is_katayaburi: bool = False
    # # ハードロック/メタルプロテクト
    is_hardrock: bool = False
    # # マルチスケイル/ファントムガード
    is_multi_slace: bool = False
    # # テラスシェル
    is_tera_shell: bool = False
    # # フェアリースキン
    is_faily_skin: bool = False
    # # いろめがね
    is_iromegane: bool = False
    # # 与えるときのダメージ倍率(タイプ別)
    cause_type_damege_special_rate: dict = Dict

    def set_extra_value(self):
        # 受けるダメージ
        if self.name_ja == "あついしぼう":
            self.half_type_id_list.append(TYPE_ID_FIRE, TYPE_ID_ICE)
        if self.name_ja == "ちくでん" or self.name_ja == "ひらいしん" or self.name_ja == "でんきエンジン":
            self.half_type_id_list.append(TYPE_ID_ELECTRIC)
        if self.name_ja == "もらいび" or self.name_ja == "こんがりボディ":
            self.no_damage_type_id_list.append(TYPE_ID_FIRE)
        if self.name_ja == "すいほう" or self.name_ja == "たいねつ":
            self.half_type_id_list.append(TYPE_ID_FIRE)
        if self.name_ja == "ちょすい" or self.name_ja == "よびみず":
            self.no_damage_type_id_list.append(TYPE_ID_WATER)
        if self.name_ja == "そうしょく":
            self.no_damage_type_id_list.append(TYPE_ID_GRASS)
        if self.name_ja == "どしょく" or self.name_ja == "ふゆう":
            self.no_damage_type_id_list.append(TYPE_ID_GROUND)
        if self.name_ja == "きよめのしお":
            self.half_type_id_list.append(TYPE_ID_GHOST)

        # 与えるダメージ
        if self.name_ja == "すいほう":
            self.cause_type_damege_special_rate = {TYPE_ID_WATER: 2.0}
        if self.name_ja == "トランジスタ":
            self.cause_type_damege_special_rate = {TYPE_ID_ELECTRIC: 1.3}
        if self.name_ja == "いわはこび":
            self.cause_type_damege_special_rate = {TYPE_ID_ROCK: 1.5}
        if self.name_ja == "りゅうのあぎと":
            self.cause_type_damege_special_rate = {TYPE_ID_DRAGON: 1.5}
        if self.name_ja == "はがねつかい" or self.name_ja == "はがねのせいしん":
            self.cause_type_damege_special_rate = {TYPE_ID_STEEL: 1.5}
        if self.name_ja == "フェアリーオーラ":
            self.cause_type_damege_special_rate = {TYPE_ID_FAIRY: 5448/4096}
        if self.name_ja == "ダークオーラ":
            self.cause_type_damege_special_rate = {TYPE_ID_DARK: 5448/4096}

        # その他
        if self.name_ja == "きもったま" or self.name_ja == "しんがん":
            self.is_scrappy = True
        if self.name_ja == "ちからもち" or self.name_ja == "ヨガパワー":
            self.is_tikaramoti = True
        if self.name_ja == "かたやぶり" or self.name_ja == "テラボルテージ" or self.name_ja == "ターボブレイズ":
            self.is_katayaburi = True
        if self.name_ja == "ハードロック" or self.name_ja == "プリズムアーマー" or self.name_ja == "フィルター":
            self.is_hardrock = True
        if self.name_ja == "マルチスケイル" or self.name_ja == "ファントムガード":
            self.is_multi_slace = True
        if self.name_ja == "テラスシェル":
            self.is_tera_shell = True
        if self.name_ja == "フェアリースキン":
            self.is_faily_skin = True
        if self.name_ja == "いろめがね":
            self.is_iromegane = True
        if self.name_ja == "てんねん":
            self.is_tennen = True
        "はりきり"
        "しんりょく"
        "もうか"
        "げきりゅう"
        "むしのしらせ"
        "かんそうはだ"
        "てつのこぶし"
        "てきおうりょく"
        "サンパワー"
        "テクニシャン"
        "すてみ"
        "ちからずく"
        "フレンドガード"
        "ヘヴィメタル"
        "ライトメタル"
        "どくぼうそう"
        "ねつぼうそう"
        "アナライズ"
        "すりぬけ"
        "すなのちから"
        "ファーコート"
        "ぼうだん"
        "がんじょうあご"
        "メガランチャー"
        "くさのけがわ"
        "かたいツメ"
        "パンクロック"
        "こおりのりんぷん"
        "ごりむちゅう"
        "わざわいのうつわ"
        "わざわいのつるぎ"
        "わざわいのおふだ"
        "わざわいのたま"
        "ひひいろのこどう"
        "ハドロンエンジン"
        "きれあじ"
        "そうだいしょう"


@dataclass
class PokemonMove:
    id: int
    name_ja: str
    name_en: str
    type: int
    accuracy: int
    power: int

    is_renzoku: bool = False
    min_renzoku: int = 0
    max_renzoku: int = 0

    def set_extra_value(self):
        if self.name_ja in MOVE_RENZOKU_DICT:
            self.is_renzoku = True
            self.min_renzoku = MOVE_RENZOKU_DICT[self.name_ja]["min"]
            self.max_renzoku = MOVE_RENZOKU_DICT[self.name_ja]["max"]
        # https://wiki.xn--rckteqa2e.com/wiki/%E9%80%A3%E7%B6%9A%E6%94%BB%E6%92%83%E6%8A%80
        if self.name_ja == "フリーズドライ":
            self.is_freeze_dry = True
        if self.name_ja == "ハイドロスチーム":
            self.is_hydro_steam = True
        if self.name_ja == "サイコブレイド":
            self.is_psy_blade = True
        if self.name_ja == "じだんだ" or self.name_ja == "やけっぱち":
            self.is_zidanda = True
        if self.name_ja in PUNCH_WAZA:
            self.is_punch = True
        if self.name_ja in TAMA_WAZA:
            self.is_tama = True
        if self.name_ja in HADOU_WAZA:
            self.is_hadou = True
        if self.name_ja in KAMITUKI_WAZA:
            self.is_kamituki = True
        if self.name_ja in KAZE_WAZA:
            self.is_kaze = True
        if self.name_ja in ODORI_WAZA:
            self.is_odori = True
        if self.name_ja in OTO_WAZA:
            self.is_oto = True
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
        if self.name_ja in ["アクロバット", "ベノムショック", "どくばりセンボン", "たたりめ", "しっぺがえし", "ゆきなだれ", "でんげきくちばし", "エラがみ",]:
            self.is_2x_under_condition = True
        if self.name_ja in ["しぼりとる", "にぎりつぶす", "ハードプレス"]:
            self.wring_out = True
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
        if self.name_ja in ["やまあらし", "こおりのいぶき", "ばちばちアクセル", "あんこくきょうだ", "すいりゅうれんだ", "トリックフラワー", "うっぷんばらし"]:
            self.is_kakutei_critical = True
        if self.name_ja in ["さばきのつぶて", "テクノバスター", "マルチアタック", "めざめるダンス"]:
            self.is_type_changeable = True
        if self.name_ja in ["フライングプレス"]:
            self.is_flying_press = True
        if self.name_ja in ["うちおとす", "サウザンアロー"]:
            self.is_flying_press = True
        if self.name_ja in ["じしん"]:
            self.is_zishin = True
        if self.name_ja in ["じしん"]:
            self.is_zishin = True
        if self.name_ja in ["メテオドライブ", "シャドーレイ", "フォトンゲイザー",]:
            self.is_katayaburi = True
        if self.name_ja in ["ワイドフォース",]:
            self.is_katayaburi = True
        if self.name_ja in ["ミストバースト",]:
            self.is_katayaburi = True
        if self.name_ja in ["ライジングボルト",]:
            self.is_katayaburi = True
        if self.name_ja in ["だいちのはどう",]:
            self.is_katayaburi = True
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
    deffense: int
    special_attack: int
    special_deffense: int
    speed: int
    # type_list:List[PokemonType]
    # ability_list:List[PokemonAbility]
    picture_url: str
    # def set_type_list(self,arg_list):
    #     temp_list=list()
    #     for arg in arg_list:
    #         id=int(arg["url"].split("/")[6])
    #         temp_list.append(PokemonType(id,arg["name"]))
    #     self.type_list=temp_list
    # def set_ability_list_list(self,arg_list):
    #     temp_list=list()
    #     for arg in arg_list:
    #         id=int(arg["url"].split("/")[6])
    #         temp_list.append(PokemonAbility(id,arg["name"]))
    #     self.ability_list=temp_list
    # def set_move_list_list(self,arg_list):
    #     temp_list=list()
    #     for arg in arg_list:
    #         id=int(arg["url"].split("/")[6])
    #         temp_list.append(PokemonAbility(id,arg["name"]))
    #     self.move_list=temp_list


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

    # シーズンごとの情報を使用率順位を取得して保存
    # 後でPokemonに合わせる
    # def set_usage_rank_list(self):
    #     res = requests.get(
    #         self.get_rankmatch_season_detail_url(),
    #         headers=pokemon_home_api_header,
    #     )
    #     usage_rank = json.loads(res.text)
    #     temp_list = list()
    #     for i, usage in enumerate(usage_rank):
    #         temp_list.append(Pokemon(
    #             usage["id"], usage["form"], i+1
    #         ))
    #     self.usage_rank_list = temp_list


def get_rankmatch_season_list() -> List[RankmatchSeason]:
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

# https://pokeapi.co/api/v2/pokemon-species/38/


def get_pokemon_list():
    url = "https://pokeapi.co/api/v2/pokemon?limit=2000"
    res = json.loads(requests.get(url).text)
    results = res["results"]
    ret_list = list()
    for _, result in enumerate(results):
        detail_url = result["url"]
        detail_res = json.loads(requests.get(detail_url).text)
        species_url = "https://pokeapi.co/api/v2/pokemon-species/%d/" % detail_res["id"]
        species_res = json.loads(requests.get(species_url).text)
        name_ja = [n for n in species_res["names"]
                   if n["language"]["name"] == "ja-Hrkt"][0]["name"]
        hp = [s for s in detail_res["stats"] if s["stat"]
              ["name"] == "hp"][0]["base_stat"]
        attack = [s for s in detail_res["stats"] if s["stat"]
                  ["name"] == "attack"][0]["base_stat"]
        deffense = [s for s in detail_res["stats"]
                    if s["stat"]["name"] == "defense"][0]["base_stat"]
        special_attack = [s for s in detail_res["stats"]
                          if s["stat"]["name"] == "special-attack"][0]["base_stat"]
        special_deffense = [s for s in detail_res["stats"]
                            if s["stat"]["name"] == "special-defense"][0]["base_stat"]
        speed = [s for s in detail_res["stats"] if s["stat"]
                 ["name"] == "speed"][0]["base_stat"]

        # type1=[t for t in detail_res["types"] if t["slot"]==1][0]
        # type2=[t for t in detail_res["types"] if t["slot"]==2]
        # type_list=[type1["type"]]
        # if len(type2)>0:
        #     type_list.append(type2[0]["type"])
        # ability1=[a for a in detail_res["abilities"] if a["slot"]==1][0]["ability"]
        # ability2=[a for a in detail_res["abilities"] if a["slot"]==2]
        # ability3=[a for a in detail_res["abilities"] if a["slot"]==3]
        # ability_list=[ability1]
        # if len(ability2)>0:
        #     ability_list.append(ability2[0]["ability"])
        # if len(ability3)>0:
        #     ability_list.append(ability3[0]["ability"])
        picture_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%d.png" % detail_res["id"]

        pokemon = Pokemon(
            detail_res["id"], name_ja, hp, attack, deffense, special_attack, special_deffense, speed, picture_url
        )
        # pokemon.set_type_list(type_list)
        # pokemon.set_ability_list_list(ability_list)

        print(pokemon, pokemon.ability_list, pokemon.type_list)

        ret_list.append(pokemon)
        # for debug
        break


def get_type_info():
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
            type_list.append(PokemonType(
                id=id,
                name_ja=name_ja,
                name_en=name_en,

            ))
        except:
            _ = 1

    writer = open("./type.json", "w")
    writer.write(json.dumps(type_list, default=default, ensure_ascii=False))
    writer.close()


def get_ability_info():
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
            # half_list,zero_list=list(),list()
            temp_ability = PokemonAbility(
                id=id, name_ja=name_ja, name_en=name_en,
            )
            # temp_ability.init()
            temp_ability.set_extra_value()
            # print(temp_ability)
            ability_list.append(temp_ability)
        except:
            _ = 1

    writer = open("./ability.json", "w")
    writer.write(json.dumps(ability_list, default=default, ensure_ascii=False))
    writer.close()


def get_move_info():
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
            temp_move = PokemonMove(
                id=id,
                name_ja=name_ja,
                name_en=name_en,
                type=type,
                accuracy=accuracy,
                power=power,
            )
            move_list.append(temp_move)
        except:
            _ = 1

    writer = open("./move.json", "w")
    writer.write(json.dumps(move_list, default=default, ensure_ascii=False))
    writer.close()


get_type_info()
get_ability_info()
get_move_info()
