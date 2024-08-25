import dataclasses
from dataclasses import dataclass
from typing import List, Dict
import time
import requests
import json
from typing import Any
from datetime import date
import os
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

    # # 与えるときのダメージ倍率(タイプ別)
    cause_type_damege_special_rate: dict = Dict
    # # 与えるときのダメージ倍率(タイプ別)
    receive_type_damege_special_rate: dict = Dict

    is_scrappy: bool = False
    is_tikaramoti: bool = False
    is_katayaburi: bool = False
    is_hardrock: bool = False
    is_multi_slace: bool = False
    is_tera_shell: bool = False
    is_faily_skin: bool = False
    is_iromegane: bool = False
    is_tennen: bool = False
    is_harikiri: bool = False
    is_tetunokobushi: bool = False
    is_tekiourixyoku: bool = False
    is_sunpower: bool = False
    is_technician: bool = False
    is_sutemi: bool = False
    is_tikarazuku: bool = False
    is_friendguard: bool = False
    is_heavymetal: bool = False
    is_lightmetal: bool = False
    is_dokubousou: bool = False
    is_netubousou: bool = False
    is_analyze: bool = False
    is_surinuke: bool = False
    is_furcoar: bool = False
    is_boudan: bool = False
    is_ganzixyouago: bool = False
    is_mega_launcher: bool = False
    is_kusanokegawa: bool = False
    is_kataitume: bool = False
    is_punkrock: bool = False
    is_koorinorinpun: bool = False
    is_gorimutixyuu: bool = False
    is_wazawainoutuwa: bool = False
    is_wazawainouturugi: bool = False
    is_wazawainoohuda: bool = False
    is_wazawainoutama: bool = False
    is_hihiironokodou: bool = False
    is_hadoronengine: bool = False
    is_kireazi: bool = False
    is_soudaisixyou: bool = False

    def set_extra_value(self):
        # 受けるダメージ
        if self.name_ja == "あついしぼう":
            self.receive_type_damege_special_rate = {
                TYPE_ID_FIRE: 0.5, TYPE_ID_ICE: 0.5}
        if self.name_ja == "ちくでん" or self.name_ja == "ひらいしん" or self.name_ja == "でんきエンジン":
            self.receive_type_damege_special_rate = {TYPE_ID_ELECTRIC: 0}
        if self.name_ja == "もらいび" or self.name_ja == "こんがりボディ":
            self.receive_type_damege_special_rate = {TYPE_ID_FIRE: 0}
        if self.name_ja == "すいほう" or self.name_ja == "たいねつ":
            self.receive_type_damege_special_rate = {TYPE_ID_FIRE: 0.5}
        if self.name_ja == "ちょすい" or self.name_ja == "よびみず":
            self.receive_type_damege_special_rate = {TYPE_ID_WATER: 0}
        if self.name_ja == "そうしょく":
            self.receive_type_damege_special_rate = {TYPE_ID_GRASS: 0}
        if self.name_ja == "どしょく" or self.name_ja == "ふゆう":
            self.receive_type_damege_special_rate = {TYPE_ID_GROUND: 0}
        if self.name_ja == "きよめのしお":
            self.receive_type_damege_special_rate = {TYPE_ID_GHOST: 0.5}
        if self.name_ja == "かんそうはだ":
            self.receive_type_damege_special_rate = {
                TYPE_ID_WATER: 0, TYPE_ID_FIRE: 1.25
            }

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
        if self.name_ja == "しんりょく":
            self.cause_type_damege_special_rate = {TYPE_ID_GRASS: 1.5}
        if self.name_ja == "もうか":
            self.cause_type_damege_special_rate = {TYPE_ID_FIRE: 1.5}
        if self.name_ja == "げきりゅう":
            self.cause_type_damege_special_rate = {TYPE_ID_WATER: 1.5}
        if self.name_ja == "むしのしらせ":
            self.cause_type_damege_special_rate = {TYPE_ID_BUG: 1.5}
        if self.name_ja == "すなのちから":
            self.cause_type_damege_special_rate = {
                TYPE_ID_ROCK: 1.3,
                TYPE_ID_GROUND: 1.3,
                TYPE_ID_STEEL: 1.3,
            }

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
        if self.name_ja in ["はりきり"]:
            self.is_harikiri = True
        if self.name_ja in ["てつのこぶし"]:
            self.is_tetunokobushi = True
        if self.name_ja in ["てきおうりょく"]:
            self.is_tekiourixyoku = True
        if self.name_ja in ["サンパワー"]:
            self.is_sunpower = True
        if self.name_ja in ["テクニシャン"]:
            self.is_technician = True
        if self.name_ja in ["すてみ"]:
            self.is_sutemi = True
        if self.name_ja in ["ちからずく"]:
            self.is_tikarazuku = True
        if self.name_ja in ["フレンドガード"]:
            self.is_friendguard = True
        if self.name_ja in ["ヘヴィメタル"]:
            self.is_heavymetal = True
        if self.name_ja in ["ライトメタル"]:
            self.is_lightmetal = True
        if self.name_ja in ["どくぼうそう"]:
            self.is_dokubousou = True
        if self.name_ja in ["ねつぼうそう"]:
            self.is_netubousou = True
        if self.name_ja in ["アナライズ"]:
            self.is_analyze = True
        if self.name_ja in ["すりぬけ"]:
            self.is_surinuke = True
        if self.name_ja in ["ファーコート"]:
            self.is_furcoar = True
        if self.name_ja in ["ぼうだん"]:
            self.is_boudan = True
        if self.name_ja in ["がんじょうあご"]:
            self.is_ganzixyouago = True
        if self.name_ja in ["メガランチャー"]:
            self.is_mega_launcher = True
        if self.name_ja in ["くさのけがわ"]:
            self.is_kusanokegawa = True
        if self.name_ja in ["かたいツメ"]:
            self.is_kataitume = True
        if self.name_ja in ["パンクロック"]:
            self.is_punkrock = True
        if self.name_ja in ["こおりのりんぷん"]:
            self.is_koorinorinpun = True
        if self.name_ja in ["ごりむちゅう"]:
            self.is_gorimutixyuu = True
        if self.name_ja in ["わざわいのうつわ"]:
            self.is_wazawainoutuwa = True
        if self.name_ja in ["わざわいのつるぎ"]:
            self.is_wazawainouturugi = True
        if self.name_ja in ["わざわいのおふだ"]:
            self.is_wazawainoohuda = True
        if self.name_ja in ["わざわいのたま"]:
            self.is_wazawainoutama = True
        if self.name_ja in ["ひひいろのこどう"]:
            self.is_hihiironokodou = True
        if self.name_ja in ["ハドロンエンジン"]:
            self.is_hadoronengine = True
        if self.name_ja in ["きれあじ"]:
            self.is_kireazi = True
        if self.name_ja in ["そうだいしょう"]:
            self.is_soudaisixyou = True

@dataclass
class PokemonItem:
    id:int
    name_ja:str
    name_en:str
    picture_url:str

@dataclass
class PokemonSeikaku:
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
    is_renzoku: bool = False
    min_renzoku: int = 0
    max_renzoku: int = 0
    is_freeze_dry: bool = False
    is_hydro_steam: bool = False
    is_psy_blade: bool = False
    is_zidanda: bool = False
    is_punch: bool = False
    is_tama: bool = False
    is_hadou: bool = False
    is_kamituki: bool = False
    is_kaze: bool = False
    is_odori: bool = False
    is_oto: bool = False
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
    deffense: int
    special_attack: int
    special_deffense: int
    speed: int
    picture_url: str
    type_id_list: List[int] = List
    ability_id_list: List[int] = List
    move_id_list: List[int] = List
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

    def set_usage_rank_list(self):
        res = requests.get(
            self.get_rankmatch_season_detail_url(),
            headers=pokemon_home_api_header,
        )
        usage_rank = json.loads(res.text)
        return usage_rank
        # print(usage_rank)
        # temp_list = list()
        # for i, usage in enumerate(usage_rank):



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

# https://pokeapi.co/api/v2/pokemon-species/38/


def decode_pokemon(data: dict) -> Pokemon:
    return Pokemon(
        id=data["id"],
        name_ja=data["name_ja"],
        hp=data["hp"],
        attack=data["attack"],
        deffense=data["deffense"],
        special_attack=data["special_attack"],
        special_deffense=data["special_deffense"],
        speed=data["speed"],
        picture_url=data["picture_url"],
        type_id_list=data["type_id_list"],
        ability_id_list=data["ability_id_list"],
        move_id_list=data["move_id_list"],
    )


def decode_pokemon_type(data: dict) -> PokemonType:
    return PokemonType(
        id=data["id"],
        name_ja=data["name_ja"],
        name_en=data["name_en"],
    )


def decode_pokemon_ability(data: dict) -> PokemonAbility:
    print(data)
    return PokemonAbility(
        id=data["id"],
        name_ja=data["name_ja"],
        name_en=data["name_en"],
        cause_type_damege_special_rate=data["cause_type_damege_special_rate"],
        receive_type_damege_special_rate=data["receive_type_damege_special_rate"],
        is_scrappy=data["is_scrappy"],
        is_tikaramoti=data["is_tikaramoti"],
        is_katayaburi=data["is_katayaburi"],
        is_hardrock=data["is_hardrock"],
        is_multi_slace=data["is_multi_slace"],
        is_tera_shell=data["is_tera_shell"],
        is_faily_skin=data["is_faily_skin"],
        is_iromegane=data["is_iromegane"],
        is_tennen=data["is_tennen"],
        is_harikiri=data["is_harikiri"],
        is_tetunokobushi=data["is_tetunokobushi"],
        is_tekiourixyoku=data["is_tekiourixyoku"],
        is_sunpower=data["is_sunpower"],
        is_technician=data["is_technician"],
        is_sutemi=data["is_sutemi"],
        is_tikarazuku=data["is_tikarazuku"],
        is_friendguard=data["is_friendguard"],
        is_heavymetal=data["is_heavymetal"],
        is_lightmetal=data["is_lightmetal"],
        is_dokubousou=data["is_dokubousou"],
        is_netubousou=data["is_netubousou"],
        is_analyze=data["is_analyze"],
        is_surinuke=data["is_surinuke"],
        is_furcoar=data["is_furcoar"],
        is_boudan=data["is_boudan"],
        is_ganzixyouago=data["is_ganzixyouago"],
        is_mega_launcher=data["is_mega_launcher"],
        is_kusanokegawa=data["is_kusanokegawa"],
        is_kataitume=data["is_kataitume"],
        is_punkrock=data["is_punkrock"],
        is_koorinorinpun=data["is_koorinorinpun"],
        is_gorimutixyuu=data["is_gorimutixyuu"],
        is_wazawainoutuwa=data["is_wazawainoutuwa"],
        is_wazawainouturugi=data["is_wazawainouturugi"],
        is_wazawainoohuda=data["is_wazawainoohuda"],
        is_wazawainoutama=data["is_wazawainoutama"],
        is_hihiironokodou=data["is_hihiironokodou"],
        is_hadoronengine=data["is_hadoronengine"],
        is_kireazi=data["is_kireazi"],
        is_soudaisixyou=data["is_soudaisixyou"],
    )


def decode_pokemon_move(data: dict) -> PokemonMove:
    return PokemonMove(
        id=data["id"],
        name_ja=data["name_ja"],
        name_en=data["name_en"],
        type=data["type"],
        accuracy=data["accuracy"],
        power=data["power"],
        is_renzoku=data["is_renzoku"],
        min_renzoku=data["min_renzoku"],
        max_renzoku=data["max_renzoku"],
        is_freeze_dry=data["is_freeze_dry"],
        is_hydro_steam=data["is_hydro_steam"],
        is_psy_blade=data["is_psy_blade"],
        is_zidanda=data["is_zidanda"],
        is_punch=data["is_punch"],
        is_tama=data["is_tama"],
        is_hadou=data["is_hadou"],
        is_kamituki=data["is_kamituki"],
        is_kaze=data["is_kaze"],
        is_odori=data["is_odori"],
        is_oto=data["is_oto"],
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
    if os.path.exists("./pokemon.json"):
        loaded_list = json.loads(
            open("./pokemon.json").read(), object_hook=decode_pokemon)
        return loaded_list
    url = "https://pokeapi.co/api/v2/pokemon?limit=2000"
    res = json.loads(requests.get(url).text)
    results = res["results"]
    ret_list = list()
    for _, result in enumerate(results):
        try:
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

            moves = [int(m["move"]["url"].split("/")[6])
                     for m in detail_res["moves"]]
            types = [int(m["type"]["url"].split("/")[6])
                     for m in detail_res["types"]]
            abilities = [int(m["ability"]["url"].split("/")[6])
                         for m in detail_res["abilities"]]

            picture_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%d.png" % detail_res[
                "id"]

            pokemon = Pokemon(
                detail_res["id"], name_ja, hp, attack, deffense, special_attack, special_deffense, speed, picture_url
            )
            pokemon.move_id_list = moves
            pokemon.type_id_list = types
            pokemon.ability_id_list = abilities

            ret_list.append(pokemon)
        except:
            1

    writer = open("./pokemon.json", "w")
    writer.write(json.dumps(ret_list, default=default, ensure_ascii=False))
    writer.close()


def get_type_list():
    if os.path.exists("./type.json"):
        loaded_list = json.loads(
            open("./type.json").read(), object_hook=decode_pokemon_type)
        return loaded_list
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


def get_ability_list():
    if os.path.exists("./ability.json"):
        temp_list=json.loads(open("./ability.json").read())

        loaded_list=list()
        for temp_row in temp_list:
            # これだけ他みたいに読み込めなくて鬱
            tttt=PokemonAbility(
                id=temp_row["id"],
                name_ja=temp_row["name_ja"],
                name_en=temp_row["name_en"],
                cause_type_damege_special_rate=temp_row["cause_type_damege_special_rate"],
                receive_type_damege_special_rate=temp_row["receive_type_damege_special_rate"],
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
                is_wazawainouturugi=temp_row["is_wazawainouturugi"],
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
            temp_ability = PokemonAbility(
                id=id, name_ja=name_ja, name_en=name_en,
            )
            temp_ability.set_extra_value()
            ability_list.append(temp_ability)
        except:
            _ = 1

    writer = open("./ability.json", "w")
    writer.write(json.dumps(ability_list, default=default, ensure_ascii=False))
    writer.close()


def get_move_list():
    if os.path.exists("./move.json"):
        loaded_list = json.loads(
            open("./move.json").read(), object_hook=decode_pokemon_move)
        return loaded_list
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


def get_item_list():
    if os.path.exists("./item.json"):
        temp_list=json.loads(open("./item.json").read())
        ret_item_list=list()
        for temp in temp_list:
            ret_item_list.append(PokemonItem(
                id=temp["id"],
                name_ja=temp["name_ja"],
                name_en=temp["name_en"],
                picture_url=temp["picture_url"],
            ))
        return ret_item_list
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

    writer = open("./item.json", "w")
    writer.write(json.dumps(move_list, default=default, ensure_ascii=False))
    writer.close()


def get_season_detail_info():
    if os.path.exists("./single_season_info.json"):
        return json.loads(open("./single_season_info.json").read())
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
    writer = open("./single_season_info.json", "w")
    writer.write(json.dumps(ret_dict, default=default, ensure_ascii=False))
    writer.close()

    return ret_dict

# https://pokeapi.co/api/v2/nature?limit=33

def get_seikaku_list():
    if os.path.exists("./seikaku.json"):
        temp_list=json.loads(open("./seikaku.json").read())
        ret_item_list=list()
        for temp in temp_list:
            ret_item_list.append(PokemonSeikaku(
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
            temp_move = PokemonSeikaku(
                id=id,
                name_ja=name_ja,
                name_en=name_en,
            )
            ret_list.append(temp_move)
        except:
            _ = 1

    writer = open("./seikaku.json", "w")
    writer.write(json.dumps(ret_list, default=default, ensure_ascii=False))
    writer.close()


# pokemon_list=get_pokemon_list()
# ability_list=get_ability_list()
# move_list=get_move_list()
# type_list=get_type_list()
# item_list=get_item_list()
# single_season_list=get_rankmatch_season_list()
# seikaku_list=get_seikaku_list()

# for single_season in single_season_list:
#     usege_info_list=single_season.set_usage_rank_list()
#     for usage_info in usege_info_list:
#         pokemon=[p for p in pokemon_list if p.id==usage_info["id"]]
#         if len(pokemon)==0:
#             raise "kusa"
#         pokemon=pokemon[0]
#         poke_detail_url = 'https://resource.pokemon-home.com/battledata/ranking/scvi/%s/%d/%d/pdetail-%d' %(single_season.id,single_season.rst,single_season.ts2,pokemon.id)
#         print(single_season.season,poke_detail_url)
#         break

#     break

