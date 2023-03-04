export const makeSelectOptions = (values: readonly string[]) => {
    return values.map(v => ({value: v, label: v.charAt(0).toUpperCase() + v.slice(1)}))
}