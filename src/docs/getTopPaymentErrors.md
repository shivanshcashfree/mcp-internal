# Payment Errors API Reference Guide

## Overview

The `getTopPaymentErrors` tool retrieves high-frequency payment error causes categorized by source, payment mode, and platform context. Use this to analyze payment failures and identify patterns in transaction errors.

## Required Parameters

- `startDateTime`: Start date-time in format "YYYY-MM-DD HH:MM:SS"
- `endDateTime`: End date-time in format "YYYY-MM-DD HH:MM:SS"
- `merchantId`: Numeric merchant identifier

## Optional Filters

### UPI Payments

```json
{
  "paymentModes": ["UPI"],
  "paymentMethodAnalytics": ["UPI"],
  "paymentMethodAnalyticsTypes": ["UPI_COLLECT", "UPI_INTENT"],
  "psps": ["GOOGLE_PAY"],
  "platforms": ["ANDROID", "IOS", "WEB", "S2S"]
}
```

### Net Banking

```json
{
  "paymentModes": ["NET_BANKING"],
  "platforms": ["ANDROID", "IOS", "WEB", "S2S"]
}
```

### Card Payments

```json
{
  "paymentModes": ["CREDIT_CARD", "DEBIT_CARD"],
  "paymentMethodAnalytics": ["CARD"],
  "paymentMethodAnalyticsTypes": ["CREDIT_CARD", "DEBIT_CARD"],
  "cardType": ["rupay", "mastercard", "visa", "maestro"],
  "customerBanks": ["qrcode"],
  "platforms": ["ANDROID", "IOS", "WEB", "S2S"]
}
```

## Filter Values Reference

### Payment Modes

- `UPI`
- `NET_BANKING`
- `CREDIT_CARD`
- `DEBIT_CARD`

### PSPs (Payment Service Providers)

- `GOOGLE_PAY`

### Payment Method Analytics

- `UPI`
- `CARD`

### Payment Method Analytics Types

- `UPI_COLLECT`
- `UPI_INTENT`
- `CREDIT_CARD`
- `DEBIT_CARD`

### Card Types

- `rupay`
- `mastercard`
- `visa`
- `mastero`

### Platforms

- `ANDROID`
- `IOS`
- `WEB`
- `S2S` (Server-to-Server)

### Customer Banks

- `qrcode`

## Response Structure

```json
{
  "data": [
    {
      "errorDescription": "Human-readable error description",
      "source": "Error source (Customer/Merchant/System)",
      "errorCount": "Number of occurrences",
      "errorRate": "Percentage rate",
      "paymentMode": "Payment method used",
      "pg": "Payment gateway identifier"
    }
  ],
  "status": "SUCCESS"
}
```

## Usage Examples

### Analyze UPI errors on mobile platforms

```json
{
  "startDateTime": "2025-05-25 00:00:00",
  "endDateTime": "2025-05-31 23:59:59",
  "merchantId": 603,
  "paymentModes": ["UPI"],
  "paymentMethodAnalytics": ["UPI"],
  "platforms": ["ANDROID", "IOS"]
}
```

### Check card payment errors for specific card types

```json
{
  "startDateTime": "2025-05-25 00:00:00",
  "endDateTime": "2025-05-31 23:59:59",
  "merchantId": 603,
  "paymentModes": ["CREDIT_CARD", "DEBIT_CARD"],
  "paymentMethodAnalytics": ["CARD"],
  "cardType": ["visa", "mastercard"]
}
```

### Get all payment errors (no filters)

```json
{
  "startDateTime": "2025-05-25 00:00:00",
  "endDateTime": "2025-05-31 23:59:59",
  "merchantId": 603
}
```

## Key Insights

- **Error Source**: Identifies if errors originate from Customer, Merchant, or System
- **Error Rate**: Percentage helps prioritize which errors to address first
- **Platform Analysis**: Compare error rates across different platforms
- **Payment Mode Comparison**: Identify which payment methods have higher failure rates
- **Temporal Analysis**: Use date ranges to identify error trends over time