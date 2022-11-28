import axios from 'axios'
import tcp from 'tcp-port-used'
const testHttp = async (url , param) => {
  if(param){
    return await axios({method: param.method , url: url, data: param.data})
      .then(res => {return res.status == 200 ? true : false})
      .catch(err => {return false})
  }
  return await axios.get(url)
    .then(res => {return res.status == 200 ? true : false})
    .catch(err => {return false})
}

const testTcp = (data) => {
  return new Promise((resolve , reject) => {
    tcp.check(Number(data.port) , data.host)
    .then(function(inUse) {
        resolve(inUse)
    }, function(err) {
        reject('Error on check:', err.message);
    });
  })
}
export default async function handler(req, res) {
  var siteData = await axios.get("https://raw.githubusercontent.com/onekill0503/personal-site/main/data.json")
    .then(res => {return res.data})
    .catch(err => setSiteData({node: [], portofolio: []}))
  for(let i = 0;i < siteData.node.length;i++){
    if(siteData.node[i].endpoint.type == 'http'){
      siteData.node[i].online = await testHttp(siteData.node[i].endpoint.host , siteData.node[i].endpoint.param ? siteData.node[i].endpoint.param : undefined)
    }else if(siteData.node[i].endpoint.type == 'tcp'){
      siteData.node[i].online = await testTcp(siteData.node[i].endpoint).then(r => {return r}).catch(err => {return false})
    }else {
      siteData.node[i].online = false
    }
  }

  res.status(200).json({
    success: true,
    data: siteData
  })
}
