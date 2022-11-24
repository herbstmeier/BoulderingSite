export default app => {
    const boulders = require("../controllers/boulder.controller.js");
    const climbs = require("../controllers/climb.controller.js");
    const sets = require("../controllers/set.controller.js");
    const ratings = require("../controllers/rating.controller.js");
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // boulder routes
    router.post("boulders/", boulders.create);
    router.get("boulders/:id", boulders.get);
    router.get("boulders/", boulders.getAll);
    router.put("boulders/:id", boulders.update);
    router.delete("boulders/:id", boulders.delete);
    router.delete("boulders/", boulders.deleteAll);

    // climb routes
    router.post("climbs/", climbs.create);
    router.get("climbs/boulder/:id", climbs.getByBoulder)
    router.get("climbs/user/:id", climbs.getByUser);
    router.delete("climbs/", climbs.delete);
    router.delete("climbs/boulder/:id", climbs.deleteByBoulder);
    router.delete("climbs/user/:id", climbs.deleteByUser);

    // set routes
    router.post("sets/", sets.create);
    router.get("sets/boulder/:id", sets.getByBoulder);
    router.get("sets/setter/:id", sets.getBySetter);
    router.delete("sets/", sets.delete);
    router.delete("sets/boulder/:id", sets.deleteByBoulder);

    // rating routes
    router.post("ratings/", ratings.create);
    router.get("ratings/boulder/:id", ratings.getByBoulder);
    router.delete("ratings/", ratings.delete);
    router.delete("ratings/boulder/:id", ratings.deleteByBoulder);

    // comment routes
    router.post("comments/", comments.create);
    router.get("comments/boulder/:id", comments.getByBoulder);
    router.put("comments/:id", comments.update);
    router.delete("comments/:id", comments.delete);
    router.delete("comments/boulder/:id", comments.deleteByBoulder);

    app.use('/api/', router);
};