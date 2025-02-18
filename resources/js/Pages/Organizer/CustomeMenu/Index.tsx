import Layout from "../../../Layouts/Organizer";

function Index() {
    return (
        <div className="page-content">
            <header>
                <h1>My Simple React Home Page</h1>
            </header>
            <main>
                <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
                <img src="https://via.placeholder.com/300" alt="Placeholder" />
            </main>
        </div>  
    )
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;
