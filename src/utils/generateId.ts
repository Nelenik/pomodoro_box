const generateId = () => (Math.random() * Date.now()).toString(36);

export default generateId;
