const Show = ({ baseTemplate }: any) => {
    return (
        <div className="bg-white rounded-lg mt-9 py-3">
            <div>
                <div className="relative mb-10">
                </div>
                <div
                    className="template-preview p-10"
                    dangerouslySetInnerHTML={{
                        __html: baseTemplate.mail_content || '',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Show;
