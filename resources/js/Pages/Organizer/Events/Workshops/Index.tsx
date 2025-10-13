import Layout from "../../../../Layouts/Event";
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ users }: any) {
    const { t } = useLaravelReactI18n();
    <div>
    <p>{t("Users page")}</p>
    </div>
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
