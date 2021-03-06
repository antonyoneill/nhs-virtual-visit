const verifyWardCode = ({ getDb }) => async (wardCode) => {
  const db = await getDb();

  try {
    const dbResponse = await db.any(
      `SELECT id, code, trust_id FROM wards WHERE code = $1 LIMIT 1`,
      [wardCode]
    );

    if (dbResponse.length > 0) {
      let [ward] = dbResponse;

      return {
        validWardCode: true,
        ward: { id: ward.id, code: ward.code, trustId: ward.trust_id },
        error: null,
      };
    } else {
      return { validWardCode: false, error: null };
    }
  } catch (error) {
    console.log(error);

    return {
      validWardCode: false,
      error: error.toString(),
    };
  }
};

export default verifyWardCode;
