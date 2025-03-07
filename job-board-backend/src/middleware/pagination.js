export const paginate = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
  
    try {
      const total = await model.countDocuments();
      req.pagination = {
        skip: startIndex,
        limit,
        total,
        page,
      };
      next();
    } catch (err) {
      next(err);
    }
  };