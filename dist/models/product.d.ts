export class Product {
    constructor(price: any, name: any, cost?: number, appliedTaxes?: any[], appliedModifiers?: any[], appliedDiscounts?: any[], appliedServiceFees?: any[], taxFree?: boolean, taxIncluded?: boolean);
    cost: number;
    price: any;
    name: any;
    appliedTaxes: any[];
    appliedModifiers: any[];
    appliedDiscounts: any[];
    appliedServiceFees: any[];
    taxFree: boolean;
    taxIncluded: boolean;
    createdDate: string;
    updatedDate: string;
    applyTax(tax: any): void;
    applyModifier(modifier: any, quantity?: number): void;
}
//# sourceMappingURL=product.d.ts.map