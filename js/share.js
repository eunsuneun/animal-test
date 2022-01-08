const url = 'https://twelve-animal-type.netlify.app';
function setShare(){
  const resultAlt = document.querySelector('.result-img').firstElementChild.alt;
  const shareTit = infoList[resultAlt].name;
  const shareDesc = '십이간지로 알아보는 나의 연애유형! 나의 연애유형은 어떤 타입?';
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
