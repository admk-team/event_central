import Layout from "../../../../Layouts/Event";
import { useLaravelReactI18n } from "laravel-react-i18n";
function Index() {
    const { t } = useLaravelReactI18n();
    return (
        <div className="page-content">
            <header>
                <h1>{t("My Simple React Home Page")}</h1>
            </header>
            <main>
                <p>{t("Welcome to my simple React home page! This is a basic example of a React project.")}</p>
                <img src="https://via.placeholder.com/300" alt="Placeholder" />
            </main>
        </div>
    )
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
