import Layout from "../../../Layouts/Organizer";

function Index({ users }: any) {
    <div>
    <p>Users page</p>
    </div>
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;