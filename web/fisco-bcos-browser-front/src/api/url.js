let api = process.env.API_PATH;

export default {
    GET_TBBLOCK_CHAIN_INFO: `${api}/home/blockChainInfo`,  //get blockChain overview//home页面的当前块高，交易总量，正在处理的交易数，pbft当前视图

    GET_TXNBY_LASTFOURTEENDAY: `${api}/home/txnLately`, //The amount of transaction information to obtain the current group for a certain period of time//折线图14天对应的日期和交易总量

    GET_TBBLOCK_INFO: `${api}/block/blockList`,  //get blocks//区块信息列表（块高，生成时间，交易数量，出块者，哈希值）

    GET_TBTRASACTION_INFO: `${api}/transaction/transactionList`,  //Get a list of transaction information under the current group//交易列表，每个交易对应的哈希值，时间戳

    GET_TBNODE_COMNECTION: `${api}/node/nodeList`,  //get a lots of nodes//节点信息列表（块高，生成时间，交易数量，出块者，哈希值）

    GET_TBTRASACTION_BY_PKHASH: `${api}/transaction/transactionByHash`,  //Obtain transaction information based on transaction hash//全部交易信息（blockhash,blockNumber,gas,from,transcation......)

    GET_TBTRASACTION__RECEIPT_BYPKHASH: `${api}/transaction/receiptByHash`, //Obtain transaction receipt information based on transaction hash//全部交易回执信息（output,blockHash,gasUsed,blockNumber.....)

    ADD_NODECONFIG_ROW: `${api}/node/add`, //add a node//该路由停用

    EDIT_NODECONFIG_ROW: `${api}/node/update`, //edit node//添加节点后的响应

    DELETE_NODECONFIG_ROW: `${api}/node/deleteById`,   //delete node//删除节点后的响应

    // GET_TBPENDING_TRANSACTION_BYPKHASH: `${api}/pendingTransaction/transactionByHash`,//Obtain transaction information based on transaction hash

    GET_TBBLOCK_BYBLOCKHASH: `${api}/block/blockByHash`,  //Obtaining Block Information Based on Block Hash//该区块全部信息{........}

    ADD_CONTRACT: `${api}/contract/add`,  //save a contract//合约保存后的响应

    GET_CONTRACT_LIST: `${api}/contract/contractList`, //get a list of contracts//获取合约列表

    DELETE_CONTRACT: `${api}/contract/deleteById`, //delete a contract//删除合约后的响应

    UPDATE_CONTRACT: `${api}/contract/update`, //update a contract//合约编译后的响应

    ADD_GROUP: `${api}/group/add`, //add a group//加入群组后的响应

    GET_GROUP_LIST: `${api}/group/groupList`, //get groups//获取群组列表（序号，群组id，群组名称，群组描述

    DELETE_GROUP: `${api}/group/deleteById`, //get groups//删除群组后的响应

    GET_BYTECODE: `${api}/transaction/code`, //Get contract binary code//与交易信息的input和交易回执信息的logs字节码相关

    GET_TRANSACTION_ANALYZEDATA: `${api}/transaction/analyzeData`, //Get the data needed for transaction parsing based on the transaction hash call//该路由停用

    UPLOAD: `${api}/contract/addBatch`,//上传合约压缩包后的响应

    ADDFUNCTION: `${api}/contract/addFunction`,//合约中的method保存后的响应

    GET_ABI_FUNCTION: `${api}/contract/function`,//与交易信息的input和交易回执信息的logs字节码相关

    GET_ABI: `${api}/contract/abi`,//与交易信息的input和交易回执信息的logs字节码相关

    GET_PICTURE_DATAAMOUNT: `${api}/transaction/getDataAmount`,//上联素材数量

    GET_PICTURE_GETTRADE: `${api}/transaction/getTrade`,//交易数量

    GET_PICTURE_GETCOPY: `${api}/transaction/getCopy`,//侵权数量

    GET_PICTURE_GETAUTH: `${api}/transaction/getAuth`,//确权数量

    GET_PICTURE_DATALATELY: `${api}/transaction/dataLately`,//上联素材走势

    GET_PICTURE_TRADELATELY: `${api}/transaction/tradeLately`,//交易走势

}
