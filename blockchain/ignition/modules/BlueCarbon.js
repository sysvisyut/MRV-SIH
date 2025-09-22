const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BlueCarbon", (m) => {
  const token = m.contract("CarbonCreditToken");
  const registry = m.contract("ProjectRegistry");
  const priceWei = m.getParameter("priceWei", "100000000000000000"); // 0.1 ETH
  const marketplace = m.contract("Marketplace", [token, priceWei]);

  return { token, registry, marketplace };
});