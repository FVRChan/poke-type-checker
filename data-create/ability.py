from dataclasses import dataclass
from typing import List, Dict
from typing import Any
from datetime import date

@dataclass
class PokemonAbility:
    id: int
    name_ja: str
    name_en: str

    is_scrappy: bool = False
    is_tikaramoti: bool = False
    is_katayaburi: bool = False
    is_hardrock: bool = False
    is_multi_slace: bool = False
    is_tera_shell: bool = False
    is_faily_skin: bool = False
    is_sky_skin: bool = False
    is_ereki_skin: bool = False
    is_freeze_skin: bool = False
    is_normal_skin: bool = False
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
    is_wazawainoturugi: bool = False
    is_wazawainoohuda: bool = False
    is_wazawainoutama: bool = False
    is_hihiironokodou: bool = False
    is_hadoronengine: bool = False
    is_kireazi: bool = False
    is_soudaisixyou: bool = False

    is_suihou: bool = False
    is_taranzisuta: bool = False
    is_iwahakobi: bool = False
    is_ryunoagito: bool = False
    
    is_haganetukai: bool = False
    is_haganenoseisin: bool = False
    is_fairyaura: bool = False
    is_darkaura: bool = False
    is_sinryoku: bool = False
    is_mouka: bool = False
    is_gekiryu: bool = False
    is_musinosirase: bool = False
    is_sunanotikara: bool = False

    def set_extra_value(self):
        # 受けるダメージ
        if self.name_ja == "あついしぼう":
            _ = 1
        if self.name_ja == "ちくでん" or self.name_ja == "ひらいしん" or self.name_ja == "でんきエンジン":
            _ = 1
        if self.name_ja == "もらいび" or self.name_ja == "こんがりボディ":
            _ = 1
        if self.name_ja == "すいほう" or self.name_ja == "たいねつ":
            _ = 1
        if self.name_ja == "ちょすい" or self.name_ja == "よびみず":
            _ = 1
        if self.name_ja == "そうしょく":
            _ = 1
        if self.name_ja == "どしょく" or self.name_ja == "ふゆう":
            _ = 1
        if self.name_ja == "きよめのしお":
            _ = 1
        if self.name_ja == "かんそうはだ":
            _ = 1

        # 与えるダメージ
        if self.name_ja == "すいほう":
            self.is_suihou = True
        if self.name_ja == "トランジスタ":
            self.is_taranzisuta = True
        if self.name_ja == "いわはこび":
            self.is_iwahakobi = True
        if self.name_ja == "りゅうのあぎと":
            self.is_ryunoagito = True
        if self.name_ja == "はがねつかい":
            self.is_haganetukai = True
        if self.name_ja == "はがねのせいしん":
            self.is_haganenoseisin = True
        if self.name_ja == "フェアリーオーラ":
            self.is_fairyaura = True
        if self.name_ja == "ダークオーラ":
            self.is_darkaura = True
        if self.name_ja == "しんりょく":
            self.is_sinryoku = True
        if self.name_ja == "もうか":
            self.is_mouka = True
        if self.name_ja == "げきりゅう":
            self.is_gekiryu = True
        if self.name_ja == "むしのしらせ":
            self.is_musinosirase = True
        if self.name_ja == "すなのちから":
            self.is_sunanotikara = True

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
        if self.name_ja == "スカイスキン":
            self.is_sky_skin = True
        if self.name_ja == "エレキスキン":
            self.is_ereki_skin = True
        if self.name_ja == "フリーズスキン":
            self.is_freeze_skin = True
        if self.name_ja == "ノーマルスキン":
            self.is_normal_skin = True
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
            self.is_wazawainoturugi = True
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


def decode_pokemon_ability(data: dict) -> PokemonAbility:
    print(data)
    return PokemonAbility(
        id=data["id"],
        name_ja=data["name_ja"],
        name_en=data["name_en"],
        is_scrappy=data["is_scrappy"],
        is_tikaramoti=data["is_tikaramoti"],
        is_katayaburi=data["is_katayaburi"],
        is_hardrock=data["is_hardrock"],
        is_multi_slace=data["is_multi_slace"],
        is_tera_shell=data["is_tera_shell"],
        is_faily_skin=data["is_faily_skin"],
        is_sky_skin=data["is_sky_skin"],
        is_ereki_skin=data["is_ereki_skin"],
        is_freeze_skin=data["is_freeze_skin"],
        is_normal_skin=data["is_normal_skin"],
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
        is_wazawainoturugi=data["is_wazawainoturugi"],
        is_wazawainoohuda=data["is_wazawainoohuda"],
        is_wazawainoutama=data["is_wazawainoutama"],
        is_hihiironokodou=data["is_hihiironokodou"],
        is_hadoronengine=data["is_hadoronengine"],
        is_kireazi=data["is_kireazi"],
        is_soudaisixyou=data["is_soudaisixyou"],
        is_suihou=data["is_suihou"],
        is_taranzisuta=data["is_taranzisuta"],
        is_iwahakobi=data["is_iwahakobi"],
        is_ryunoagito=data["is_ryunoagito"],
        is_haganetukai=data["is_haganetukai"],
        is_haganenoseisin=data["is_haganenoseisin"],
        is_fairyaura=data["is_fairyaura"],
        is_darkaura=data["is_darkaura"],
        is_sinryoku=data["is_sinryoku"],
        is_mouka=data["is_mouka"],
        is_gekiryu=data["is_gekiryu"],
        is_musinosirase=data["is_musinosirase"],
        is_sunanotikara=data["is_sunanotikara"],
    )

