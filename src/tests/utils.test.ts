import {
  getMonth,
  formatCurrency,
  stripDbMetadata,
  removeCommonNulls,
  getMonthlyNetWorthTotals,
} from "../lib/utils";

describe("Utils", () => {
  describe("getMonth", () => {
    it("should return the full month name", () => {
      const result = getMonth("2022-01-01T12:11:08.879+00:00");
      expect(result).toBe("January");
    });

    it("should return the short month name", () => {
      const result = getMonth("2022-01-01T12:11:08.879+00:00", true);
      expect(result).toBe("Jan");
    });
  });

  describe("formatCurrency", () => {
    it("should format the number as currency with rounding", () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe("$1,235");
    });

    it("should format the negative number as currency with rounding", () => {
      const result = formatCurrency(-1234.56);
      expect(result).toBe("-$1,235");
    });

    it("should format the number as currency without rounding", () => {
      const result = formatCurrency(1234.567, false);
      expect(result).toBe("$1,234.57");
    });

    it("should format the negative number as currency without rounding", () => {
      const result = formatCurrency(-1234.567, false);
      expect(result).toBe("-$1,234.57");
    });

    it("should scale and round the number for thousands", () => {
      const result = formatCurrency(123656, true, true);
      expect(result).toBe("$124K");
    });

    it("should scale and round the negative number for thousands", () => {
      const result = formatCurrency(-123656, true, true);
      expect(result).toBe("-$124K");
    });

    it("should scale and not round the number for thousands", () => {
      const result = formatCurrency(123656, false, true);
      expect(result).toBe("$123.66K");
    });

    it("should scale and round the number for millions", () => {
      const result = formatCurrency(1254567, true, true);
      expect(result).toBe("$1.3M");
    });

    it("should scale and not round the number for millions", () => {
      const result = formatCurrency(1254567, false, true);
      expect(result).toBe("$1.25M");
    });
  });

  describe("stripDbMetadata", () => {
    it("should remove database metadata properties", () => {
      const obj = {
        name: "John",
        $id: "123",
        $collectionId: "users",
        $databaseId: "finance",
        $permissions: {},
        $createdAt: "2022-01-01",
        $updatedAt: "2022-01-02",
      };
      const result = stripDbMetadata(obj);
      expect(result).toEqual({ name: "John", $id: "123" });
    });
  });

  describe("removeCommonNulls", () => {
    it("should remove common null keys from objects", () => {
      const data = [
        { id: 1, name: "John", age: null, sex: null },
        { id: 2, name: "Jane", age: null, sex: null },
        { id: 3, name: "Bob", age: null, sex: "male" },
      ];
      const result = removeCommonNulls(data);
      expect(result).toEqual([
        { id: 1, name: "John", sex: null },
        { id: 2, name: "Jane", sex: null },
        { id: 3, name: "Bob", sex: "male" },
      ]);
    });

    it("should handle empty data", () => {
      const data: any[] = [];
      const result = removeCommonNulls(data);
      expect(result).toEqual([]);
    });
  });

  describe("getMonthlyNetWorthTotals", () => {
    it("should calculate monthly net worth totals", () => {
      const data = [
        {
          date: "2024-01-17T12:26:10.048+00:00",
          cash: 1000.45,
          stocks: 500,
          $id: "66b8f45e000d8a4ffcfb",
        },
        {
          date: "2024-04-16T00:00:47.926+00:00",
          cash: 2500,
          stocks: 200,
          $id: "66b845ad003121330411",
        },
        {
          date: "2024-05-14T12:11:08.879+00:00",
          cash: 300,
          stocks: 4000,
          $id: "66b8f0dc002c86bdec3c",
        },
      ];
      const result = getMonthlyNetWorthTotals(data);
      expect(result).toEqual([
        { month: "January", total: 1500.45 },
        { month: "April", total: 2700 },
        { month: "May", total: 4300 },
      ]);
    });
  });
});
