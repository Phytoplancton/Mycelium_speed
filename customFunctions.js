export const mod = (m, n)=>{
    return (m % n + n) % n
}

export function arrayMax(arr) {
    return arr.length ? Math.max(...arr) : 0;
};