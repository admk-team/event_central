import flagus from "../../images/flags/us.svg";
import flagspain from "../../images/flags/spain.svg";
import flaggermany from "../../images/flags/germany.svg";
import flagitaly from "../../images/flags/italy.svg";
import flagrussia from "../../images/flags/russia.svg";
import flagchina from "../../images/flags/china.svg";
import flagfrench from "../../images/flags/french.svg";
import flagarabic from "../../images/flags/ae.svg";

const languages = {
  sp: { label: "Española", flag: flagspain },
  gr: { label: "Deutsche", flag: flaggermany },
  it: { label: "Italiana", flag: flagitaly },
  rs: { label: "русский",  flag: flagrussia },
  en: { label: "English",  flag: flagus },
  cn: { label: "中国人",     flag: flagchina },
  fr: { label: "français", flag: flagfrench },
  ar: { label: "Arabic",   flag: flagarabic } // 👈 mark RTL
};

export default languages;
