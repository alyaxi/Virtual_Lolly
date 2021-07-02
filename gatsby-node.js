const path = require("path")

exports.createPages = async ({actions, graphql}) => {
    const {createPage} = actions

    const data = await graphql(`
        query MyQuery {
            LollyData{
                LollyData{
                    lollypath
                }
            }
    
    `)
    console.log("data in node file " + data);
    data.data.LollyData.LollyData.lollypath.forEach(({lollypath}) => {
        console.log("lollypath node" , lollypath);
        createPage({
            path:`/lollies/${lollypath}`,
            component:path.resolve("./src/pages/Showlolly.tsx"),
            context: {
                lollypath:lollypath
              }
        })
    });
}