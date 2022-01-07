const url = 'https://twelve-animal-type.netlify.app';
function setShare(){
  const resultAlt = document.querySelector('.result-img').firstElementChild.alt;
  const shareTit = '십이간지 연애유형 결과';
  const shareDesc = infoList[resultAlt].name;
  const shareImg = url + '/img/image-' + resultAlt + '.png';
  const shareURL = url + '/pages/' + resultAlt + '.html';

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTit,
      description: shareDesc,
      imageUrl: shareImg,
      link: {
        mobileWebUrl: shareURL,
        webUrl : shareURL
      },
    },
    buttons: [
      {
        title: '나도 테스트 해보기',
        link: {
          mobileWebUrl: shareURL,
          webUrl : shareURL
        },
      }
    ]
  });
}
