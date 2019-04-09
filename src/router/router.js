const asyncLoader = "../utility/asyncLoader";
const expressLoader = "express";

export default new Promise(async asyncExport => {
    const { default: catchEm} = await import(asyncLoader);
    const [error, {default: Router}] = await catchEm(import(expressLoader));
    const router = Router();
    const routerFn = () => {

        return router
    }
    asyncExport(routerFn)
})