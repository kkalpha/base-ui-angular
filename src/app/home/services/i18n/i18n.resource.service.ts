
import { ApiService } from '../../../uilib/services/api.service';
import { Injectable } from '@angular/core';


@Injectable()
export class I18nResourceService  {
    public lan_zh_tw = { 'AlertWithPhilips': '僅針對團體出差', 'ChooseGrade': '選擇級別',
    'AlertPersonInfo': '以上部分信息申請人不能自己修改,請聯繫管理員補充/修改信息。管理員名單請查看幫助文檔。',
    'Rejected': '已拒絕', 'Remark': '備註', 'Training': '培訓', 'HotelReservation': '酒店預訂', 'TaiWan': '臺灣',
    'Taxi': '出租車', 'InProgress': '審批中', 'DepartureDate': '出發日期', 'ErrorTravelPurpose': '請輸入出差目的!',
    'MenuApprovalDelegator': '審批代理', 'IdentityName': '身份證姓名', 'MenuProcessManagement': '審批管理',
    'ApplicationPartIV': '第四部分：酒店信息', 'PersonaRequestDelegator': '代申請者', 'ErrorPwd':
    '請輸入你的密碼!', 'TravelClass': '艙位', 'EmergencyContactTel': '緊急聯絡人電話',
    'TravelPurpose': '出差目的', 'Login': '登錄', 'EmailAddress': '郵箱地址', 'ApplicationPartII':
    '第二部分：出差信息', 'Project': '項目', 'ErrorDepartureDate': '請選擇出發日期!', 'removeAgent': '移除代理',
    // tslint:disable-next-line:max-line-length
    'AlertProjectNo': '請根據所在ORU的格式要求填寫項目號IG&S R&D: 20xx0-xxxx or HC: HK90: Q-000xxxxxxx.010000 or CN90: Q-66xxxxxxxx.010000。', 'WithBPOTemp': '携公司非正式員工', 'CheckOutDate': '至', 'Trains': '火車', 'Cancel': '取消', 'OtherCostCenter': '為其他成本中心出差', 'AsiaOther': '亞太區（非港澳臺）', 'TicketRequest': '是否需要訂票?', 'RequestDate': '申請日期', 'NewApplication': '新的申請', 'Logout': '登出', 'MenuToDo': '待處理', 'HomeLeave': '探親假(需HR審批)', 'MenuApplication': '出差管理', 'EmployeeId': '員工編號', 'IdentityNo': '身份證號', 'RequestNo': '申請流水號', 'ReturnDate': '返回日期', 'Bus': '汽車', 'EconomyClass': '普通經濟艙', 'AlertFlightInfomation': '請在出差行程里填寫完整的往返行程信息！', 'Intercontinental': '跨洲', 'ErrorEmail': '請輸入你的郵箱!', 'Draft': '草稿', 'MenuMyApplication': '我的申請', 'UploadFile': '上傳文件', 'IdentityPassportNo': '身份證/護照號', 'TravelApplication': '出差申請', 'PassportNo': '護照號', 'Submit': '提交', 'Add': '添加', 'All': '全部', 'ProjectNo': '項目編號', 'ApplicationPartV': '第五部分：審批流程', 'ErrorProjectNo': '請輸入項目號!', 'HomeTitle': 'E-travel System', 'PrivateCar': '私家車', 'CompanyName': '公司名稱', 'ApplicationPartI': '第一部分：基本信息', 'PassportName': '護照姓名', 'Search': '查詢', 'HotelName': '酒店名稱', 'ErrorReturnDate': '請選擇返回日期!', 'InternalMeeting': '內部會議', 'To': '目的地', 'MenuPersonalSetting': '个人设置', 'WithNonPhilips': '携非本公司人員', 'DiscountedEconomyClass': '折扣經濟艙', 'ApplicationPartVI': '第六部分：審批狀態更新', 'PremiumEconomyClass': '超級經濟艙', 'Approved': '已批准', 'IdentityPassportName': '身份證/護照姓名', 'Grade': '員工級別', 'City': '城市', 'TotalDuration': '總行程天數', 'ErrorDestinantions': '請選擇途徑地!', 'ChineseName': '中文名稱', 'Destinantions': '途徑地(多選)', 'MenuApproverConfig': '審批人管理', 'FlightNumber': '航班碼', 'Save': '保存', 'RequestedBy': '登錄系統用戶', 'CheckInDate': '自', 'Yes': '是', 'SelectEmployee': '選擇員工', 'TransportationType': '交通類型', 'Macau': '澳門', 'ErrorGrade': '請選擇員工級別!', 'Attachments': '附件', 'Reason': '事由', 'ErrorSelctOption': '請選擇該選項!', 'WithPhilips': '携本公司正式員工', 'ContactTel': '聯繫電話', 'ORU': 'ORU', 'CostCenter': '成本中心', 'Flights': '飛機', 'ApplicationPartIII': '第三部分：出差行程', 'China': '中國', 'RentalCar': '租賃汽車', 'SelectAgent': '選擇代理', 'Relocation': '工作地點調動', 'RequestFor': '實際出差人', 'No': '否', 'AlertFileUpload': '國際出差必須在此處上傳附件（例如：邀請函）', 'Others': '其他', 'BusinessVisit': '考察', 'Return': '返回', 'Sector': 'Sector', 'BusinessClass': '商務艙', 'ErrorReason': '請選擇事由!', 'Purpose': '目的', 'From': '出發地', 'HongKong': '香港', 'MenuProfile': '个人信息', 'RememberMe': '記住我', 'CustomerVenderVisit': '拜訪客戶/供應商', 'EmergencyContactName': '緊急聯絡人姓名', 'ApplyForBPO': '僅为BPO/Temp申請' };
    constructor(
        private apiService: ApiService
    ) {
    }

}
