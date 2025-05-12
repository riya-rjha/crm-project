export const calculateDeliveryStatus = () => {
    let success = Math.random();
    if (success >= 0.5) {
        return "success";
    } else return "fail";
}

export const createPersonalizedMessage = (name) => {
    return `Hi ${name}, here’s 10% off on your next order!`;
}