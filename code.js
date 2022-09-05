'use strict';

export class UserAccount {
    constructor() {
        this.paymentDates = [];
        this.services = [];
    }

    recalculateBalance() {
        const unitRate = 0.8;

        for (const service of this.services) {
            const tariffs = service.getTariffs();
            const historyOfCalculation = this.calculationHistoryService.retrieveHistory(service);

            //find last calculation date
            let lastCalculationDate = UserAccount.EPOCH_TIMESTAMP;
            
            for (const payment of this.paymentDates) {
                lastCalculationDate = new Date(Math.max(payment.getTime(), lastCalculationDate));
            }

            let highestTariff = 0;
            if (tariffs.length) {
                for (const tariff of tariffs) {
                    const tariffType = tariff.getType();
                    highestTariff = Math.max(highestTariff, this.calculateUnapplied(tariff, lastCalculationDate, historyOfCalculation, unitRate, tariffType, service));
                }
            }

            h.applyRecalculation(highestTariff, unitRate);
            this.balance.updateBalance(highestTariff);
        }
    }

    calculateUnapplied(tariff, lastCalculationDate, h, unitRate, t, service) {
        const fees = h.getAllFees(tariff, service);
        let sum = 0;

        for (const date of fees.keys()) {
            if (date > lastCalculationDate) {
                sum += fees.get(date) * ((t.isUnitBased()) ? unitRate : 1) + tariff.getAdditionalFee();
            }
        }
        return sum;
    }

    setCalculationHistoryService(calculationHistoryService) {
        this.calculationHistoryService = calculationHistoryService;
    }

    setServices(newServices) {
        this.services = newServices;
    }

    setBalance(newBalance) {
        this.balance = newBalance;
    }

    setPaymentDates(newPaymentDates) {
        this.paymentDates = newPaymentDates;
    }
}

UserAccount.EPOCH_TIMESTAMP = 0;
