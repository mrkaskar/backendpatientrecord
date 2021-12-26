const auth = require("./getAuth");
const fs = require('fs');
const { google } = require('googleapis');

async function searchId(parentid, folderName) {
  const drive = google.drive({version: 'v3', auth: await auth()});
  let q =`'${parentid}' in parents`;  
  if(folderName) q+= ` AND name='${folderName}'`;
  const file = await drive.files.list({
    pageSize:2,
    fields: 'files(id)',
    q
  });
  return file.data.files[0].id;
}

async function listFiles(parentid) {
  const drive = google.drive({version: 'v3', auth: await auth()});
  let q =`'${parentid}' in parents`;  
  const file = await drive.files.list({
    q,
    maxResults: 999, 
    fields: 'files(id)',
  })
  return file.data.files.map(e => e.id);
}

async function deleteFile(id) {
  const drive = google.drive({version: 'v3', auth: await auth()});
  await drive.files.delete({
    fileId: id
  })
  return 'success';
}


async function updateName(fileId, name) {
  const drive = google.drive({version: 'v3', auth: await auth()});

  drive.files.update({
    fileId,
    resource: {
      'name': name
    }
  }).then(function(){
    console.log('updated');
  }).catch(e => {
    console.log(e.message);
  })
}


async function listImages() {
  const drive = google.drive({version: 'v3', auth: await auth()});
  const file = await drive.files.list({
    fields: 'files(id)',
    q: `mimeType='image/png' OR mimeType='image/jpeg'`,
    maxResults: 999,
  });
  return file.data.files.map(e => e.id);
} 


async function download(id) {
  const drive = google.drive({version: 'v3', auth: await auth()});
  const dest = fs.createWriteStream(`./temp/images/${id}.jpg`);
  try {
  const result = await drive.files.get(
    { fileId:id, alt: 'media' },
    { responseType: 'stream' }
  );
  result.data.pipe(dest);  
  }
  catch(e){
    console.log(e.message);
    throw new Error (e.message);
  }
}

async function createFolder(foldername, parentId) {
  const drive = google.drive({version: 'v3', auth: await auth()});
  let folderMetadata = {
    'name': foldername,
    'mimeType': 'application/vnd.google-apps.folder',
    'parents': [parentId]
  } 
  let file = await drive.files.create({
    resource: folderMetadata,
    fields: 'id'
  });
  
  return file.data.id;
}

async function upload(filename,path, parentId) {
  const drive = google.drive({version: 'v3', auth: await auth()});
  let fileMetadata = {
    'name' : filename,
    'parents': [parentId]
  }

  let media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(path)
  };
  
  try{
  let file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id'
  });
  return file.data.id;
    
  }
  catch(e) {
    console.log(e);
    throw new Error(e.message);    
  }
}

module.exports = { searchId, download, createFolder, upload, listImages, updateName, listFiles, deleteFile };
