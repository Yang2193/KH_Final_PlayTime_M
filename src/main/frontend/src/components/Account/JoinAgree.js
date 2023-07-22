import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ParentWrapper, InnerWrapper, FlexRowWrapper } from "./Wrapper";
import JoinButton from "./JoinButton";
import AccountPopUp from "./AccountPopUp";

const AgreementWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AgreementTitle = styled.h3`
  color: #3B74EC;
  font-size: 0.8rem;
  margin: 0;
`;

const AgreementContent = styled.div`
  width: 100%;
  height: 150px;
  font-size: 0.8rem;
  flex-wrap: wrap;
  overflow-y: scroll;
  border: 1px solid #eee;
  border-radius: 10px;
`;

const Checkbox = styled.input`
  margin-right: 6px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
`;

const NextButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
`;


const Agreement = () => {
  const navigate = useNavigate();

  const [isCheckedAgreement1, setIsCheckedAgreement1] = useState(false);
  const [isCheckedAgreement2, setIsCheckedAgreement2] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 팝업
  const [showPopUp, setShowPopUp] = useState(false);

  // 모든 약관 동의 체크박스
  const handleAllCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAgreement1(isChecked);
    setIsCheckedAgreement2(isChecked);
    setIsAllChecked(isChecked);
  };

  // 1) PLAYTIME 이용약관 동의 체크박스
  const handleCheckboxChangeAgreement1 = (e) => {
    setIsCheckedAgreement1(e.target.checked);
    setIsAllChecked(e.target.checked && isCheckedAgreement2);
  };

  // 2) 개인정보 수집 및 이용 동의 체크박스
  const handleCheckboxChangeAgreement2 = (e) => {
    setIsCheckedAgreement2(e.target.checked);
    setIsAllChecked(e.target.checked && isCheckedAgreement1);
  };

  // '다음'버튼
  const handleNextButtonClick = () => {
    if(isAllChecked) {
      console.log("Step2로 이동");
      navigate('step2');
    } else {
      setShowPopUp(true);
    }
  };



  return (
        <ParentWrapper width="40">
          <InnerWrapper width="90" gap="20">
            {/* 모든 약관 동의 체크박스&문구 */}
            <FlexRowWrapper>
            <Checkbox type="checkbox" checked={isAllChecked} onChange={handleAllCheckboxChange} />
            <Label>PLAYTIME 이용약관, 개인정보 수집 및 이용에 &nbsp; <u>모두 동의</u>합니다. </Label>
            </FlexRowWrapper>
            {/* PLAYTIME 이용약관 */}
            <AgreementWrapper>
                <AgreementTitle>
                <Checkbox type="checkbox" checked={isCheckedAgreement1} onChange={handleCheckboxChangeAgreement1} />
                PLAYTIME 이용약관 동의(필수)
                </AgreementTitle>
                <AgreementContent>
                    <p>제 1 장 총 칙</p>
                        <p>제 1 조 (목적)<br/>이 약관은 PLAYTIME(이하 "사이트"라 합니다)에서 제공하는 인터넷서비스(이하 "서비스"라 합니다)의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.</p>
                        <p>제 2 조 (약관의 효력 및 변경)<br/>
                        ① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게 공지함으로써 효력을 발생합니다.<br/>
                        ② 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
                        </p>
                        <p>제 3 조 (용어의 정의)<br/>
                        이 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br/>
                        ① 회원 : 사이트와 서비스 이용계약을 체결하거나 이용자 닉네임을 부여받은 개인 또는 단체를 말합니다.<br/>
                        ② 신청자 : 회원가입을 신청하는 개인 또는 단체를 말합니다.<br/>
                        ③ 닉네임 : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는 문자와 숫자의 조합을 말합니다.<br/>
                        ④ 비밀번호 : 회원이 부여 받은 닉네임과 일치된 회원임을 확인하고, 회원 자신의 비밀을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다.<br/>
                        ⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.</p>
                        <p>제 2 장 서비스 이용계약</p>
                        <p>제 4 조 (이용계약의 성립)
                        ① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로 간주됩니다.<br/>
                        ② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여 사이트가 승낙함으로써 성립합니다.</p>
                        <p>제 5 조 (이용신청)<br/>
                        ① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청 양식에서 요구하는 이용자 정보를 기록하여 제출해야 합니다.<br/>
                        ② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제 데이터인 것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스의 제한을 받을 수 있습니다.</p>
                        <p>제 6 조 (이용신청의 승낙)<br/>
                        ① 사이트는 신청자에 대하여 제2항, 제3항의 경우를 예외로 하여 서비스 이용신청을 승낙합니다.<br/>
                        ② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.<br/>
                        가. 서비스 관련 설비에 여유가 없는 경우<br/>
                        나. 기술상 지장이 있는 경우<br/>
                        다. 기타 사이트가 필요하다고 인정되는 경우<br/>
                        ③ 사이트는 신청자가 다음에 해당하는 경우에는 승낙을 거부할 수 있습니다.<br/>
                        가. 다른 개인(사이트)의 명의를 사용하여 신청한 경우<br/>
                        나. 이용자 정보를 허위로 기재하여 신청한 경우<br/>
                        다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우<br/>
                        라. 기타 사이트 소정의 이용신청요건을 충족하지 못하는 경우</p>
                        <p>제 7 조 (이용자정보의 변경)<br/>
                        회원은 이용 신청시에 기재했던 회원정보가 변경되었을 경우에는, 온라인으로 수정하여야 하며 변경하지 않음으로 인하여 발생되는 모든 문제의 책임은 회원에게 있습니다.</p>
                        <p>제 3 장 계약 당사자의 의무</p>
                        <p>제 8 조 (사이트의 의무)<br/>
                        ① 사이트는 회원에게 각 호의 서비스를 제공합니다.<br/>
                        가. 신규서비스와 도메인 정보에 대한 뉴스레터 발송<br/>
                        나. 추가 도메인 등록시 개인정보 자동 입력<br/>
                        다. 도메인 등록, 관리를 위한 각종 부가서비스<br/>
                        ② 사이트는 서비스 제공과 관련하여 취득한 회원의 개인정보를 회원의 동의없이 타인에게 누설, 공개 또는 배포할 수 없으며, 서비스관련 업무 이외의 상업적 목적으로 사용할 수 없습니다. 단, 다음 각 호의 1에 해당하는 경우는 예외입니다.<br/>
                        가. 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우<br/>
                        나. 범죄에 대한 수사상의 목적이 있거나 정보통신윤리 위원회의 요청이 있는 경우<br/>
                        다. 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우<br/>
                        ③ 사이트는 이 약관에서 정한 바에 따라 지속적, 안정적으로 서비스를 제공할 의무가 있습니다.</p>
                        <p>제 9 조 (회원의 의무)<br/>
                        ① 회원은 서비스 이용 시 다음 각 호의 행위를 하지 않아야 합니다.<br/>
                        가. 다른 회원의 정보를 부정하게 사용하는 행위<br/>
                        나. 서비스에서 얻은 정보를 사이트의 사전승낙 없이 회원의 이용 이외의 목적으로 복제하거나 이를 변경, 출판 및 방송 등에 사용하거나 타인에게 제공하는 행위<br/>
                        다. 사이트의 저작권, 타인의 저작권 등 기타 권리를 침해하는 행위<br/>
                        라. 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등을 타인에게 유포하는 행위<br/>
                        마. 범죄와 결부된다고 객관적으로 판단되는 행위<br/>
                        바. 기타 관계법령에 위배되는 행위<br/>
                        ② 회원은 관계법령, 이 약관에서 규정하는 사항, 서비스 이용 안내 및 주의 사항을 준수하여야 합니다.<br/>
                        ③ 회원은 내용별로 사이트가 서비스 공지사항에 게시하거나 별도로 공지한 이용 제한 사항을 준수하여야 합니다.</p>
                        <p>제 4 장 서비스 제공 및 이용</p>
                        <p>제 10 조 (회원 닉네임과 비밀번호 관리에 대한 회원의 의무)<br/>
                        ① 닉네임과 비밀번호에 대한 모든 관리는 회원에게 책임이 있습니다. 회원에게 부여된 닉네임과 비밀번호의 관리소홀, 부정사용에 의하여 발생하는 모든 결과에 대한 전적인 책임은 회원에게 있습니다.<br/>
                        ② 자신의 닉네임이 부정하게 사용된 경우 또는 기타 보안 위반에 대하여, 회원은 반드시 사이트에 그 사실을 통보해야 합니다.</p>
                        <p>제 11 조 (서비스 제한 및 정지)<br/>
                        ① 사이트는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우와 전기통신사업법에 의한 기간통신 사업자가 전기통신서비스를 중지하는 등 기타 불가항력적 사유가 있는 경우에는 서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다.<br/>
                        ② 사이트는 제1항의 규정에 의하여 서비스의 이용을 제한하거나 정지할 때에는 그 사유 및 제한기간 등을 지체없이 회원에게 알려야 합니다.</p>
                        <p>제5장 계약사항의 변경, 해지</p>
                        <p>제 12 조 (정보의 변경)<br/>
                        회원이 주소, 비밀번호 등 고객정보를 변경하고자 하는 경우에는 홈페이지의 회원정보 변경 서비스를 이용하여 변경할 수 있습니다.</p>
                        <p>제 13 조 (계약사항의 해지)<br/>
                        회원은 서비스 이용계약을 해지할 수 있으며, 해지할 경우에는 본인이 직접 서비스를 통하거나 전화 또는 온라인 등으로 사이트에 해지신청을 하여야 합니다. 사이트는 해지신청이 접수된 당일부터 해당 회원의 서비스 이용을 제한합니다. 사이트는 회원이 다음 각 항의 1에 해당하여 이용계약을 해지하고자 할 경우에는 해지조치 7일전까지 그 뜻을 이용고객에게 통지하여 소명할 기회를 주어야 합니다.<br/>
                        ① 이용고객이 이용제한 규정을 위반하거나 그 이용제한 기간 내에 제한 사유를 해소하지 않는 경우<br/>
                        ② 정보통신윤리위원회가 이용해지를 요구한 경우<br/>
                        ③ 이용고객이 정당한 사유 없이 의견진술에 응하지 아니한 경우<br/>
                        ④ 타인 명의로 신청을 하였거나 신청서 내용의 허위 기재 또는 허위서류를 첨부하여 이용계약을 체결한 경우<br/>
                        사이트는 상기 규정에 의하여 해지된 이용고객에 대해서는 별도로 정한 기간동안 가입을 제한할 수 있습니다.</p>
                        <p>제6장 손해배상</p>
                        <p>제 14 조 (면책조항)<br/>
                        ① 사이트는 회원이 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.<br/>
                        ② 사이트는 회원의 귀책사유나 제3자의 고의로 인하여 서비스에 장애가 발생하거나 회원의 데이터가 훼손된 경우에 책임이 면제됩니다.<br/>
                        ③ 사이트는 회원이 게시 또는 전송한 자료의 내용에 대해서는 책임이 면제됩니다.<br/>
                        ④ 상표권이 있는 도메인의 경우, 이로 인해 발생할 수도 있는 손해나 배상에 대한 책임은 구매한 회원 당사자에게 있으며, 사이트는 이에 대한 일체의 책임을 지지 않습니다.</p>
                        <p>제 15 조 (관할법원)</p>
                        <p>서비스와 관련하여 사이트와 회원간에 분쟁이 발생할 경우 사이트의 본사 소재지를 관할하는 법원을 관할법원으로 합니다.</p>
                        <p>(시행일)이 개인정보처리방침은 2023년 4월 30일부터 적용됩니다.</p>
                    </AgreementContent>
            </AgreementWrapper>
            {/* 개인정보 수집 및 이용약관 */}
            <AgreementWrapper>
                <AgreementTitle>
                <Checkbox type="checkbox" checked={isCheckedAgreement2} onChange={handleCheckboxChangeAgreement2} />
                개인정보 수집 및 이용 동의(필수)
                </AgreementTitle>
                <AgreementContent>
                    <p>&lt; PLAYTIME &gt;('http://ticket-playtime.xyz'이하 'PLAYTIME')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
                    <p>○ 이 개인정보처리방침은 2023년 4월 30일부터 적용됩니다.</p>
                    <p>제1조(개인정보의 처리 목적)<br/>
                    &lt; PLAYTIME &gt;('http://ticket-playtime.xyz'이하 'PLAYTIME')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/>
                    1. 홈페이지 회원가입 및 관리<br/>
                    회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 목적으로 개인정보를 처리합니다.<br/>
                    2. 민원사무 처리<br/>
                    민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.<br/>
                    3. 재화 또는 서비스 제공<br/>
                    서비스 제공, 콘텐츠 제공을 목적으로 개인정보를 처리합니다.<br/>
                    4. 마케팅 및 광고에의 활용<br/>
                    이벤트 및 광고성 정보 제공 및 참여기회 제공 , 서비스의 유효성 확인 등을 목적으로 개인정보를 처리합니다.
                    </p>
                    <p>
                    제2조(개인정보의 처리 및 보유 기간)<br/>
                    ① &lt; PLAYTIME &gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.<br/>
                    ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    </p>
                    <p>
                    제3조(처리하는 개인정보의 항목)<br/>
                    ① &lt; PLAYTIME &gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.<br/>
                    1&lt; 홈페이지 회원가입 및 관리 &gt;<br/>
                    필수항목 : 이메일, 닉네임, 비밀번호<br/>
                    </p>
                    <p>
                    제4조(개인정보의 제3자 제공에 관한 사항)<br/>
                    ① &lt; PLAYTIME &gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.<br/>
                    ② &lt; PLAYTIME &gt;은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
                    </p>
                    <p>
                    제5조(개인정보처리의 위탁에 관한 사항)<br/>
                    ① &lt; PLAYTIME &gt;은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.<br/>
                    ② &lt; PLAYTIME &gt;은(는) 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.<br/>
                    ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                    </p>
                    <p>
                    제6조(개인정보의 파기절차 및 파기방법)<br/>
                    ① &lt; PLAYTIME &gt;은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br/>
                    ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br/>
                    1. 법령 근거 :<br/>
                    2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜<br/>
                    ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br/>
                    1. 파기절차<br/>
                    &lt; PLAYTIME &gt;은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt; PLAYTIME &gt; 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br/>
                    2. 파기방법<br/>
                    전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다
                    </p>
                    <p>
                    제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)<br/>
                    ① 정보주체는 PLAYTIME에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
                    ② 제1항에 따른 권리 행사는PLAYTIME에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 PLAYTIME은(는) 이에 대해 지체 없이 조치하겠습니다.<br/>
                    ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/>
                    ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/>
                    ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br/>
                    ⑥ PLAYTIME은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br/>
                    </p>
                    <p>
                    제8조(개인정보의 안전성 확보조치에 관한 사항)<br/>
                    &lt; PLAYTIME &gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br/>
                    1. 정기적인 자체 감사 실시<br/>
                    개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.<br/>
                    2. 개인정보 취급 직원의 최소화 및 교육<br/>
                    개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.<br/>
                    3. 내부관리계획의 수립 및 시행<br/>
                    개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
                    </p>
                    <p>
                    제9조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)<br/>
                    PLAYTIME 은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.
                    </p>
                    <p>
                    제10조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)<br/>
                    행태정보의 수집·이용·제공 및 거부등에 관한 사항<br/>
                    &lt; PLAYTIME &gt;은(는) 온라인 맞춤형 광고 등을 위한 행태정보를 수집·이용·제공하지 않습니다.
                    </p>
                    <p>
                    제11조(추가적인 이용·제공 판단기준)<br/>
                    &lt; PLAYTIME &gt;은(는) ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.<br/>
                    이에 따라 &lt; PLAYTIME &gt;가(이) 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.<br/>
                    ▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부<br/>
                    ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부<br/>
                    ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부<br/>
                    ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부<br/>
                    ※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성·공개함
                    </p>
                    <p>
                    제12조(가명정보를 처리하는 경우 가명정보 처리에 관한 사항)<br/>
                    &lt; PLAYTIME &gt;은(는) 다음과 같은 목적으로 가명정보를 처리하고 있습니다.<br/>
                    ▶ 가명정보의 처리 목적<br/>
                    ▶ 가명정보의 처리 및 보유기간<br/>
                    ▶ 가명처리하는 개인정보의 항목<br/>
                    ▶ 법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가명정보의 안전성 확보조치에 관한 사항
                    </p>
                    <p>
                    제13조 (개인정보 보호책임자에 관한 사항)<br/>
                    ① PLAYTIME 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br/>
                    ▶ 개인정보 보호책임자<br/>
                    성명 :PLAYTIME<br/>
                    직책 :대표<br/>
                    직급 :대표<br/>
                    연락처 :010-1111-1111, playtimedevelop@gmail.com,<br/>
                    ※ 개인정보 보호 담당부서로 연결됩니다.
                    </p>
                    <p>
                    제14조(정보주체의 권익침해에 대한 구제방법)<br/>
                    정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.<br/>
                    1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)<br/>
                    2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)<br/>
                    3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)<br/>
                    4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)<br/>
                    「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.<br/>
                    ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
                    </p>
                    <p>제15조(개인정보 처리방침 변경)<br/>
                    ① 이 개인정보처리방침은 2023년 4월 30일부터 적용됩니다.
                    </p>
                </AgreementContent>
            </AgreementWrapper>
          </InnerWrapper>
        {/* 버튼 */}
        <NextButtonWrapper>
            {isAllChecked ? (
            <JoinButton
                onClick={handleNextButtonClick}
                sx={{ 
                backgroundColor:"#3B74EC",
                color: "#E5E7EA",
                fontWeight: "bold",
                }}
            >
                다음
            </JoinButton>
            ) : (
            <JoinButton
                onClick={handleNextButtonClick}
                sx={{ 
                backgroundColor:"#E5E7EA",
                color: "#1E2B4D",
                    "&:hover": { 
                    backgroundColor: "#E5E7EA",
                    // color: "#E5E7EA"
                    }
                }}
                >
                다음
            </JoinButton>
            )}
        </NextButtonWrapper>
        {/* 팝업 */}
      <AccountPopUp open={showPopUp} close={() => setShowPopUp(false)} header="❗️" closeText="확인">
        모든 이용 약관에 동의해 주세요.
      </AccountPopUp>
    </ParentWrapper>
  );
};
export default Agreement;