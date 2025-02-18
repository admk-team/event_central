
import Layout from '../../../Layouts/Organizer';

function Index({ users }: any) {
    <div className="page-content">

    <p>Schedule page</p>
    </div>
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;