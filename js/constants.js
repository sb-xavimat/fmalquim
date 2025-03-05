const COLOR = {
    red: "#f00",
    1: "#f00",

    orange: "#f90",
    2: "#f90",

    green: "#080",
    3: "#080",

    lightGreen: "#0b0",
    4: "#0b0",

    lilac: "#a0f",
    5: "#a0f",

    grey: "#888",
    6: "#888",
};

const EXAMPLES = {"4": ["Ag2O", "Al2O3", "Au2O", "Au2O3", "BeO", "Bi2O5", "CaO", "CdO", "Co2O3", "CoO", "Cr2O3", "CrO3", "Cu2O", "CuO", "Fe2O3", "FeO", "Ga2O3", "GeO2", "K2O", "Li2O", "MgO", "Mn2O3", "Mn2O7", "MnO2", "MnO3", "Mo2O5", "Na2O", "Ni2O3", "NiO", "PbO", "PbO2", "PdO", "PtO", "PtO2", "RaO", "Rb2O", "Sb2O5", "SnO2", "SrO", "Ti2O3", "TiO2", "ZnO"], "9": ["Ag2O2", "Au2(O2)3", "Au2O2", "BaO2", "CaO2", "CdO2", "CoO2", "Cs2O2", "Cu2O2", "CuO2", "FeO2", "H2O2", "K2O2", "Li2O2", "MgO2", "Na2O2", "NiO2", "RaO2", "Rb2O2", "SrO2", "Ti2(O2)3", "ZnO2"], "8": ["AgCl", "AlBr3", "AlCl3", "Au2S3", "AuBr", "AuBr3", "AuF", "AuI3", "BaF2", "BaI2", "CaCl2", "CaS", "CoBr2", "CoCl2", "Cr2Se3", "Cr2Te3", "CrS3", "CuBr", "CuCl2", "Fe2S3", "FeCl3", "FeI3", "FeS", "HgBr", "HgF2", "HgI2", "HgS", "K2S", "KBr", "KF", "Li2S", "LiCl", "LiI", "MgCl2", "MgF2", "MgS", "MgSe", "Mn2S7", "MnF6", "MnS2", "NaCl", "Ni2S3", "NiCl3", "NiS", "PbCl4", "PbF4", "PbI2", "PbI4", "PbS2", "PdF4", "PdS", "PtI4", "PtSe2", "RbBr", "SnF4", "SrF2", "SrSe", "ZnCl2", "ZnI2"], "13": ["AgClO3", "AgIO4", "AlPO4", "Ca(MnO4)2", "Ca(NO3)2", "CaCO3", "CaSO4", "Cu2SO4", "CuCrO4", "CuSO3", "CuSO4", "Fe(NO3)3", "Fe2(SO4)3", "Hg2SO3", "HgSO3", "K2CO3", "K3AsO3", "K3PO4", "KClO", "KNO2", "KNO3", "LiBrO3", "Mg(ClO4)2", "Na2CO3", "Na2SO3", "NaClO", "NaNO3", "NiSO3", "Pb(SeO4)2", "Sn(ClO)2", "Zn(ClO2)2", "Zn3(PO4)2"], "2": ["AgH", "AlH3", "AsH3", "AuH", "AuH3", "BH3", "BaH2", "BeH2", "BiH5", "CaH2", "CdH2", "CoH2", "CoH3", "CrH3", "CrH6", "CsH", "CuH", "CuH2", "FeH2", "FeH3", "GaH3", "HgH2", "InH3", "KH", "LiH", "MgH2", "MnH4", "MnH7", "MoH4", "NaH", "NbH5", "NiH2", "NiH3", "PbH4", "PdH4", "PtH2", "PtH4", "RbH", "SbH5", "ScH3", "SiH4", "SnH2", "SnH4", "SrH2", "TcH6", "TiH3", "TiH4", "VH2", "VH3", "VH4", "ZnH2"], "14": ["AgHSO3", "AgHSO4", "Ca(H2PO4)2", "Ca(HSO3)2", "CaHPO4", "CsH2PO4", "CsHSO4", "CuHAsO4", "CuHCO3", "Fe(HSO4)3", "FeHBO3", "K2HPO4", "KH2BO3", "KHCO3", "KHSO4", "Li2HBO3", "LiH2BO3", "LiH2PO4", "LiHCO2", "Mg(HCO3)2", "MgHPO4", "Na2HPO4", "NaH2PO4", "NaHCO3", "NaHSO4", "NiHPO4", "Zn(HSO4)2"], "10": ["AgOH", "Al(OH)3", "Au(OH)3", "AuOH", "Ba(OH)2", "Be(OH)2", "Bi(OH)3", "Bi(OH)5", "Cd(OH)2", "Co(OH)2", "Co(OH)3", "Cr(OH)6", "Cu(OH)2", "CuOH", "Fe(OH)2", "Fe(OH)3", "FrOH", "Ga(OH)3", "Hg(OH)2", "In(OH)3", "KOH", "LiOH", "Mg(OH)2", "Mn(OH)4", "Mn(OH)6", "Mn(OH)7", "NaOH", "Ni(OH)3", "Pb(OH)4", "Pd(OH)2", "Pt(OH)4", "Ra(OH)2", "Sc(OH)3", "Sn(OH)2", "Sr(OH)2", "Ti(OH)4", "Zn(OH)2"], "5": ["As2O3", "As2O5", "B2O3", "CO", "CO2", "N2O3", "N2O5", "P2O3", "P2O5", "SO2", "SO3", "Sb2O3", "Sb2O5", "SeO", "SeO2", "SeO3", "SiO2", "TeO2", "TeO3"], "1": ["Br2", "Cl2", "F2", "Fe", "H2", "He", "I2", "K", "N2", "Na", "Ni", "O2", "O3", "P4", "S6", "S8", "Zn"], "7": ["CBr2", "CBr4", "CCl2", "CCl4", "CF2", "CI4", "CS2", "CSe2", "GeCl4", "N2S3", "N2S5", "NBr3", "NBr5", "NCl3", "NCl5", "NF5", "NI5", "P2S3", "P2S5", "P2Se3", "P2Se5", "PBr3", "PCl3", "PCl5", "PF3", "PF5", "PI5", "SBr6", "SCl4", "SCl6", "SF6", "SI4", "SI6", "SbCl5", "SeBr4", "SeCl4", "SeCl6", "SiCl4"], "12": ["H2CO2", "H2CO3", "H2Cr2O7", "H2CrO4", "H2MnO4", "H2SO3", "H2SO4", "H2TeO3", "H3AsO4", "H3BO3", "H3PO3", "H3PO4", "H4SiO4", "HBrO", "HBrO2", "HBrO4", "HClO", "HClO2", "HClO4", "HIO", "HIO3", "HIO4", "HMnO4", "HNO2", "HNO3"], "3": ["H2S", "H2Se", "H2Te", "HBr", "HCl", "HF", "HI"], "6": ["O3Br2", "O3Cl2", "O3I2", "O5Br2", "O5Cl2", "O5I2", "O7Br2", "O7Cl2", "O7I2", "OBr2", "OCl2", "OF2", "OI2"]};
