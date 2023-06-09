var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require('puppeteer');
var Product = require('../models/scrapedDataModel');
var url = "https://mcdonalds.pl/nasze-menu/";
var openWebPage = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 3:
                _a.sent();
                return [2 /*return*/, page];
        }
    });
}); };
var scrapData = function () { return __awaiter(_this, void 0, void 0, function () {
    var page, products, productsImg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openWebPage(url)];
            case 1:
                page = _a.sent();
                return [4 /*yield*/, page.$$eval('.product_thumb-text', function (elements) {
                        return elements.map(function (el) { return el.textContent.trim(); });
                    })];
            case 2:
                products = _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var images = Array.from(document.querySelectorAll('div.product_thumb > a > img'));
                        return images.map(function (img) { return img.src; });
                    })];
            case 3:
                productsImg = _a.sent();
                page.close();
                return [2 /*return*/, { products: products, productsImg: productsImg }];
        }
    });
}); };
var setProducts = function () { return __awaiter(_this, void 0, void 0, function () {
    var menu, _a, products, productsImg;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                menu = [];
                return [4 /*yield*/, scrapData()];
            case 1:
                _a = _b.sent(), products = _a.products, productsImg = _a.productsImg;
                products.forEach(function (productText, index) { return __awaiter(_this, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        product = new Product({
                            name: productText,
                            image: productsImg[index],
                            price: 0,
                            type: "",
                            size: ""
                        });
                        try {
                            menu.push(product);
                        }
                        catch (error) {
                            console.log(error);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/, menu];
        }
    });
}); };
module.exports = { setProducts: setProducts };
