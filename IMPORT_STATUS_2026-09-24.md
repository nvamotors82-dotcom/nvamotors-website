# NVAMOTORS inventory import staging

Date: 2026-09-24

- Production main branch intentionally left unchanged until validation is complete.
- Local recovery copy: D:\\NVAMOTORS_SAFE\\nvamotors-website
- Source extraction workspace: D:\\NVAMOTORS_IMPORT
- 51 unique vehicle records have been fully extracted and normalized from the current source detail pages.
- Pricing rule applied in the staging dataset: source advertised price + $500.
- VIN, mileage, engine, drivetrain, transmission, trim, features and vehicle photo URLs are preserved when available.
- Source dealer logos/contact/business boilerplate are excluded from the normalized vehicle records.
- User previously stated the expected source inventory is 54 vehicles. Because only 51 unique complete source records are currently captured, production deployment is blocked until the remaining 3 records are recovered or the live source count is confirmed as 51.

This branch is the safe staging branch for the import. Do not merge to main until count and build validation pass.