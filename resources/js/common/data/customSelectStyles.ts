export const customStyles = {
    multiValue: (styles: any, { data }: any) => {
        return {
            ...styles,
            // backgroundColor: "#3762ea",
        };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
        ...styles,
        backgroundColor: "var(--vz-secondary-bg-subtle)",
        color: "black",
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
        ...styles,
        color: "black",
        backgroundColor: "var(--vz-secondary-bg-subtle)",
        ':hover': {
            backgroundColor: "var(--vz-secondary-bg-subtle)",
            color: 'dark',
        },
    }),
}