<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VelzonRoutesController extends Controller
{
    // dashboard

    public function index()
    {
        return Inertia::render('Theme/DashboardEcommerce/index');
    }

    public function dashboard_analytics()
    {
        return Inertia::render('Theme/DashboardAnalytics/index');
    }

    public function dashboard_crm()
    {
        return Inertia::render('Theme/DashboardCrm/index');
    }

    public function dashboard()
    {
        return Inertia::render('Theme/DashboardEcommerce/index');
    }

    public function dashboard_crypto()
    {
        return Inertia::render('Theme/DashboardCrypto/index');
    }

    public function dashboard_projects()
    {
        return Inertia::render('Theme/DashboardProject/index');
    }

    public function dashboard_nft()
    {
        return Inertia::render('Theme/DashboardNFT/index');
    }

    public function dashboard_job()
    {
        return Inertia::render('Theme/DashboardJob/index');
    }

    public function dashboard_blog()
    {
        return Inertia::render('Theme/DashboardBlog/index');
    }

    // apps

    public function apps_calendar()
    {
        return Inertia::render('Theme/Calendar/index');
    }

    public function apps_calendar_month_grid()
    {
        return Inertia::render('Theme/Calendar/monthGrid');
    }

    public function apps_ecommerce_products()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceProducts/index');
    }

    public function apps_ecommerce_product_details()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceProducts/EcommerceProductDetail');
    }

    public function apps_ecommerce_add_product()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceProducts/EcommerceAddProduct');
    }

    public function apps_ecommerce_order_details()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceOrders/EcommerceOrderDetail');
    }

    public function apps_ecommerce_customers()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceCustomers/index');
    }

    public function apps_ecommerce_cart()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceCart');
    }

    public function apps_ecommerce_checkout()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceCheckout');
    }

    public function apps_ecommerce_sellers()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceSellers/index');
    }

    public function apps_ecommerce_seller_details()
    {
        return Inertia::render('Theme/Ecommerce/EcommerceSellers/EcommerceSellerDetail');
    }

    public function apps_file_manager()
    {
        return Inertia::render('Theme/FileManager/index');
    }

    public function apps_todo()
    {
        return Inertia::render('Theme/ToDo/index');
    }

    public function apps_chat()
    {
        return Inertia::render('Theme/Chat/index');
    }

    public function apps_mailbox()
    {
        return Inertia::render('Theme/EmailInbox/index');
    }

    public function apps_email_basic()
    {
        return Inertia::render('Theme/Email/EmailTemplates/BasicAction/index');
    }

    public function apps_email_ecommerce()
    {
        return Inertia::render('Theme/Email/EmailTemplates/EcommerceAction/index');
    }

    public function apps_projects_list()
    {
        return Inertia::render('Theme/Projects/ProjectList/index');
    }

    public function apps_projects_overview()
    {
        return Inertia::render('Theme/Projects/ProjectOverview/index');
    }

    public function apps_projects_create()
    {
        return Inertia::render('Theme/Projects/CreateProject/index');
    }

    public function apps_tasks_list_view()
    {
        return Inertia::render('Theme/Tasks/TaskList/index');
    }

    public function apps_tasks_details()
    {
        return Inertia::render('Theme/Tasks/TaskDetails/index');
    }

    public function apps_tasks_kanban()
    {
        return Inertia::render('Theme/Tasks/KanbanBoard/index');
    }

    public function apps_api_key()
    {
        return Inertia::render('Theme/APIKey/index');
    }

    public function apps_crm_contacts()
    {
        return Inertia::render('Theme/Crm/CrmContacts');
    }

    public function apps_crm_companies()
    {
        return Inertia::render('Theme/Crm/CrmCompanies');
    }

    public function apps_crm_deals()
    {
        return Inertia::render('Theme/Crm/CrmDeals/index');
    }

    public function apps_crm_leads()
    {
        return Inertia::render('Theme/Crm/CrmLeads/index');
    }

    public function apps_invoices_list()
    {
        return Inertia::render('Theme/Invoices/InvoiceList');
    }

    public function apps_invoices_details()
    {
        return Inertia::render('Theme/Invoices/InvoiceDetails');
    }

    public function apps_invoices_create()
    {
        return Inertia::render('Theme/Invoices/InvoiceCreate');
    }

    public function apps_tickets_list()
    {
        return Inertia::render('Theme/SupportTickets/ListView/index');
    }

    public function apps_tickets_details()
    {
        return Inertia::render('Theme/SupportTickets/TicketsDetails/index');
    }

    public function apps_crypto_transactions()
    {
        return Inertia::render('Theme/Crypto/Transactions/index');
    }

    public function apps_crypto_buy_sell()
    {
        return Inertia::render('Theme/Crypto/BuySell/index');
    }

    public function apps_crypto_orders()
    {
        return Inertia::render('Theme/Crypto/CryptoOrder/index');
    }

    public function apps_crypto_wallet()
    {
        return Inertia::render('Theme/Crypto/MyWallet/index');
    }

    public function apps_crypto_ico()
    {
        return Inertia::render('Theme/Crypto/ICOList/index');
    }

    public function apps_crypto_kyc()
    {
        return Inertia::render('Theme/Crypto/KYCVerification/index');
    }

    public function apps_nft_marketplace()
    {
        return Inertia::render('Theme/NFTMarketplace/Marketplace/index');
    }

    public function apps_nft_collections()
    {
        return Inertia::render('Theme/NFTMarketplace/Collections/index');
    }

    public function apps_nft_create()
    {
        return Inertia::render('Theme/NFTMarketplace/CreateNFT/index');
    }

    public function apps_nft_creators()
    {
        return Inertia::render('Theme/NFTMarketplace/Creators/index');
    }

    public function apps_nft_explore()
    {
        return Inertia::render('Theme/NFTMarketplace/ExploreNow/index');
    }

    public function apps_nft_item_details()
    {
        return Inertia::render('Theme/NFTMarketplace/Itemdetails/index');
    }

    public function apps_nft_auction()
    {
        return Inertia::render('Theme/NFTMarketplace/LiveAuction/index');
    }

    public function apps_nft_ranking()
    {
        return Inertia::render('Theme/NFTMarketplace/Ranking/index');
    }

    public function apps_nft_wallet()
    {
        return Inertia::render('Theme/NFTMarketplace/WalletConnect/index');
    }

    public function apps_job_statistics()
    {
        return Inertia::render('Theme/Jobs/Statistics/index');
    }

    public function apps_job_lists()
    {
        return Inertia::render('Theme/Jobs/JobList/List/index');
    }

    public function apps_job_grid_lists()
    {
        return Inertia::render('Theme/Jobs/JobList/Grid/index');
    }

    public function apps_job_details()
    {
        return Inertia::render('Theme/Jobs/JobList/Overview/index');
    }

    public function apps_job_candidate_lists()
    {
        return Inertia::render('Theme/Jobs/CandidateList/ListView/index');
    }

    public function apps_job_candidate_grid()
    {
        return Inertia::render('Theme/Jobs/CandidateList/GridView/index');
    }

    public function apps_job_application()
    {
        return Inertia::render('Theme/Jobs/Application/index');
    }

    public function apps_job_new()
    {
        return Inertia::render('Theme/Jobs/NewJob/index');
    }

    public function apps_job_companies_lists()
    {
        return Inertia::render('Theme/Jobs/CompaniesList/index');
    }

    public function apps_job_categories()
    {
        return Inertia::render('Theme/Jobs/JobCategories/index');
    }

    // charts

    public function charts_apex_line()
    {
        return Inertia::render('Theme/Charts/ApexCharts/LineCharts/index');
    }

    public function charts_apex_area()
    {
        return Inertia::render('Theme/Charts/ApexCharts/AreaCharts/index');
    }

    public function charts_apex_column()
    {
        return Inertia::render('Theme/Charts/ApexCharts/ColumnCharts/index');
    }

    public function charts_apex_bar()
    {
        return Inertia::render('Theme/Charts/ApexCharts/BarCharts/index');
    }

    public function charts_apex_mixed()
    {
        return Inertia::render('Theme/Charts/ApexCharts/MixedCharts/index');
    }

    public function charts_apex_timeline()
    {
        return Inertia::render('Theme/Charts/ApexCharts/TimelineCharts/index');
    }

    public function charts_apex_range_area()
    {
        return Inertia::render('Theme/Charts/ApexCharts/RangeAreaCharts/Index');
    }

    public function charts_apex_funnel()
    {
        return Inertia::render('Theme/Charts/ApexCharts/FunnelCharts/Index');
    }

    public function charts_apex_candlestick()
    {
        return Inertia::render('Theme/Charts/ApexCharts/CandlestickChart/index');
    }

    public function charts_apex_boxplot()
    {
        return Inertia::render('Theme/Charts/ApexCharts/BoxplotCharts/index');
    }

    public function charts_apex_bubble()
    {
        return Inertia::render('Theme/Charts/ApexCharts/BubbleChart/index');
    }

    public function charts_apex_scatter()
    {
        return Inertia::render('Theme/Charts/ApexCharts/ScatterCharts/index');
    }

    public function charts_apex_heatmap()
    {
        return Inertia::render('Theme/Charts/ApexCharts/HeatmapCharts/index');
    }

    public function charts_apex_treemap()
    {
        return Inertia::render('Theme/Charts/ApexCharts/TreemapCharts/index');
    }

    public function charts_apex_pie()
    {
        return Inertia::render('Theme/Charts/ApexCharts/PieCharts/index');
    }

    public function charts_apex_radialbar()
    {
        return Inertia::render('Theme/Charts/ApexCharts/RadialbarCharts/index');
    }

    public function charts_apex_radar()
    {
        return Inertia::render('Theme/Charts/ApexCharts/RadarCharts/index');
    }

    public function charts_apex_polar()
    {
        return Inertia::render('Theme/Charts/ApexCharts/PolarCharts/index');
    }

    public function charts_apex_slope()
    {
        return Inertia::render('Theme/Charts/ApexCharts/SlopeCharts/index');
    }

    public function charts_chartjs()
    {
        return Inertia::render('Theme/Charts/ChartsJs/index');
    }

    public function charts_echarts()
    {
        return Inertia::render('Theme/Charts/ECharts/index');
    }

    // ui

    public function ui_alerts()
    {
        return Inertia::render('Theme/BaseUi/UiAlerts/UiAlerts');
    }

    public function ui_badges()
    {
        return Inertia::render('Theme/BaseUi/UiBadges/UiBadges');
    }

    public function ui_buttons()
    {
        return Inertia::render('Theme/BaseUi/UiButtons/UiButtons');
    }

    public function ui_colors()
    {
        return Inertia::render('Theme/BaseUi/UiColors/UiColors');
    }

    public function ui_cards()
    {
        return Inertia::render('Theme/BaseUi/UiCards/UiCards');
    }

    public function ui_carousel()
    {
        return Inertia::render('Theme/BaseUi/UiCarousel/UiCarousel');
    }

    public function ui_dropdowns()
    {
        return Inertia::render('Theme/BaseUi/UiDropdowns/UiDropdowns');
    }

    public function ui_grid()
    {
        return Inertia::render('Theme/BaseUi/UiGrid/UiGrid');
    }

    public function ui_images()
    {
        return Inertia::render('Theme/BaseUi/UiImages/UiImages');
    }

    public function ui_tabs()
    {
        return Inertia::render('Theme/BaseUi/UiTabs/UiTabs');
    }

    public function ui_accordions()
    {
        return Inertia::render('Theme/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse');
    }

    public function ui_modals()
    {
        return Inertia::render('Theme/BaseUi/UiModals/UiModals');
    }

    public function ui_offcanvas()
    {
        return Inertia::render('Theme/BaseUi/UiOffcanvas/UiOffcanvas');
    }

    public function ui_placeholders()
    {
        return Inertia::render('Theme/BaseUi/UiPlaceholders/UiPlaceholders');
    }

    public function ui_progress()
    {
        return Inertia::render('Theme/BaseUi/UiProgress/UiProgress');
    }

    public function ui_notifications()
    {
        return Inertia::render('Theme/BaseUi/UiNotifications/UiNotifications');
    }

    public function ui_media()
    {
        return Inertia::render('Theme/BaseUi/UiMediaobject/UiMediaobject');
    }

    public function ui_embed_video()
    {
        return Inertia::render('Theme/BaseUi/UiEmbedVideo/UiEmbedVideo');
    }

    public function ui_typography()
    {
        return Inertia::render('Theme/BaseUi/UiTypography/UiTypography');
    }

    public function ui_lists()
    {
        return Inertia::render('Theme/BaseUi/UiLists/UiLists');
    }

    public function ui_links()
    {
        return Inertia::render('Theme/BaseUi/UiLinks/UiLinks');
    }

    public function ui_general()
    {
        return Inertia::render('Theme/BaseUi/UiGeneral/UiGeneral');
    }

    public function ui_ribbons()
    {
        return Inertia::render('Theme/BaseUi/UiRibbons/UiRibbons');
    }

    public function ui_utilities()
    {
        return Inertia::render('Theme/BaseUi/UiUtilities/UiUtilities');
    }

    // advanced-ui

    public function advance_ui_scrollbar()
    {
        return Inertia::render('Theme/AdvanceUi/UiScrollbar/UiScrollbar');
    }

    public function advance_ui_swiper()
    {
        return Inertia::render('Theme/AdvanceUi/UiSwiperSlider/UiSwiperSlider');
    }

    public function advance_ui_ratings()
    {
        return Inertia::render('Theme/AdvanceUi/UiRatings/UiRatings');
    }

    public function advance_ui_highlight()
    {
        return Inertia::render('Theme/AdvanceUi/UiHighlight/UiHighlight');
    }

    // widgets

    public function widgets()
    {
        return Inertia::render('Theme/Widgets/Index');
    }

    // forms

    public function forms_elements()
    {
        return Inertia::render('Theme/Forms/BasicElements/BasicElements');
    }

    public function forms_select()
    {
        return Inertia::render('Theme/Forms/FormSelect/FormSelect');
    }

    public function forms_checkboxes_radios()
    {
        return Inertia::render('Theme/Forms/CheckboxAndRadio/CheckBoxAndRadio');
    }

    public function forms_pickers()
    {
        return Inertia::render('Theme/Forms/FormPickers/FormPickers');
    }

    public function forms_masks()
    {
        return Inertia::render('Theme/Forms/Masks/Masks');
    }

    public function forms_advanced()
    {
        return Inertia::render('Theme/Forms/FormAdvanced/FormAdvanced');
    }

    public function forms_range_sliders()
    {
        return Inertia::render('Theme/Forms/FormRangeSlider/FormRangeSlider');
    }

    public function forms_validation()
    {
        return Inertia::render('Theme/Forms/FormValidation/FormValidation');
    }

    public function forms_wizard()
    {
        return Inertia::render('Theme/Forms/FormWizard/FormWizard');
    }

    public function forms_editors()
    {
        return Inertia::render('Theme/Forms/FormEditor/FormEditor');
    }

    public function forms_file_uploads()
    {
        return Inertia::render('Theme/Forms/FileUpload/FileUpload');
    }

    public function forms_layouts()
    {
        return Inertia::render('Theme/Forms/FormLayouts/Formlayouts');
    }

    public function forms_select2()
    {
        return Inertia::render('Theme/Forms/Select2/Select2');
    }

    // tables

    public function tables_basic()
    {
        return Inertia::render('Theme/Tables/BasicTables/BasicTables');
    }

    public function tables_react()
    {
        return Inertia::render('Theme/Tables/ReactTables/index');
    }


    // icons

    public function icons_remix()
    {
        return Inertia::render('Theme/Icons/RemixIcons/RemixIcons');
    }

    public function icons_boxicons()
    {
        return Inertia::render('Theme/Icons/BoxIcons/BoxIcons');
    }

    public function icons_materialdesign()
    {
        return Inertia::render('Theme/Icons/MaterialDesign/MaterialDesign');
    }

    public function icons_feather()
    {
        return Inertia::render('Theme/Icons/FeatherIcons/FeatherIcons');
    }

    public function icons_lineawesome()
    {
        return Inertia::render('Theme/Icons/LineAwesomeIcons/LineAwesomeIcons');
    }

    public function icons_crypto()
    {
        return Inertia::render('Theme/Icons/CryptoIcons/CryptoIcons');
    }

    // map

    public function maps_google()
    {
        return Inertia::render('Theme/Maps/GoogleMaps/GoogleMaps');
    }

    // pages

    public function pages_starter()
    {
        return Inertia::render('Theme/Pages/Starter/Starter');
    }

    public function pages_profile()
    {
        return Inertia::render('Theme/Pages/Profile/SimplePage/SimplePage');
    }

    public function pages_profile_settings()
    {
        return Inertia::render('Theme/Pages/Profile/Settings/Settings');
    }

    public function pages_team()
    {
        return Inertia::render('Theme/Pages/Team/Team');
    }

    public function pages_timeline()
    {
        return Inertia::render('Theme/Pages/Timeline/Timeline');
    }

    public function pages_faqs()
    {
        return Inertia::render('Theme/Pages/Faqs/Faqs');
    }

    public function pages_gallery()
    {
        return Inertia::render('Theme/Pages/Gallery/Gallery');
    }

    public function pages_pricing()
    {
        return Inertia::render('Theme/Pages/Pricing/Pricing');
    }

    public function pages_search_results()
    {
        return Inertia::render('Theme/Pages/SearchResults/SearchResults');
    }

    public function pages_sitemap()
    {
        return Inertia::render('Theme/Pages/SiteMap/SiteMap');
    }

    public function pages_privacy_policy()
    {
        return Inertia::render('Theme/Pages/PrivacyPolicy/index');
    }

    public function pages_terms_condition()
    {
        return Inertia::render('Theme/Pages/TermsCondition/index');
    }

    public function pages_blog_grid()
    {
        return Inertia::render('Theme/Pages/Blogs/GridView/index');
    }

    public function pages_blog_list()
    {
        return Inertia::render('Theme/Pages/Blogs/ListView/index');
    }

    public function pages_blog_overview()
    {
        return Inertia::render('Theme/Pages/Blogs/Overview/index');
    }

    public function pages_maintenance()
    {
        return Inertia::render('Theme/Pages/Maintenance/Maintenance');
    }

    public function pages_coming_soon()
    {
        return Inertia::render('Theme/Pages/ComingSoon/ComingSoon');
    }

    // auth inner

    public function auth_signin_basic()
    {
        return Inertia::render('Theme/AuthInner/Login/BasicSignIn');
    }

    public function auth_signin_cover()
    {
        return Inertia::render('Theme/AuthInner/Login/CoverSignIn');
    }

    public function auth_signup_basic()
    {
        return Inertia::render('Theme/AuthInner/Register/BasicSignUp');
    }

    public function auth_signup_cover()
    {
        return Inertia::render('Theme/AuthInner/Register/CoverSignUp');
    }

    public function auth_pass_reset_basic()
    {
        return Inertia::render('Theme/AuthInner/PasswordReset/BasicPasswReset');
    }

    public function auth_pass_reset_cover()
    {
        return Inertia::render('Theme/AuthInner/PasswordReset/CoverPasswReset');
    }

    public function auth_lockscreen_basic()
    {
        return Inertia::render('Theme/AuthInner/LockScreen/BasicLockScr');
    }

    public function auth_lockscreen_cover()
    {
        return Inertia::render('Theme/AuthInner/LockScreen/CoverLockScr');
    }

    public function auth_logout_basic()
    {
        return Inertia::render('Theme/AuthInner/Logout/BasicLogout');
    }

    public function auth_logout_cover()
    {
        return Inertia::render('Theme/AuthInner/Logout/CoverLogout');
    }

    public function auth_success_msg_basic()
    {
        return Inertia::render('Theme/AuthInner/SuccessMessage/BasicSuccessMsg');
    }

    public function auth_success_msg_cover()
    {
        return Inertia::render('Theme/AuthInner/SuccessMessage/CoverSuccessMsg');
    }

    public function auth_twostep_basic()
    {
        return Inertia::render('Theme/AuthInner/TwoStepVerification/BasicTwosVerify');
    }

    public function auth_twostep_cover()
    {
        return Inertia::render('Theme/AuthInner/TwoStepVerification/CoverTwosVerify');
    }

    public function auth_404_basic()
    {
        return Inertia::render('Theme/AuthInner/Error/Basic404');
    }

    public function auth_404_cover()
    {
        return Inertia::render('Theme/AuthInner/Error/Cover404');
    }

    public function auth_404_alt()
    {
        return Inertia::render('Theme/AuthInner/Error/Alt404');
    }

    public function auth_500()
    {
        return Inertia::render('Theme/AuthInner/Error/Error500');
    }

    public function auth_pass_change_basic()
    {
        return Inertia::render('Theme/AuthInner/PasswordCreate/BasicPasswCreate');
    }

    public function auth_pass_change_cover()
    {
        return Inertia::render('Theme/AuthInner/PasswordCreate/CoverPasswCreate');
    }

    public function auth_offline()
    {
        return Inertia::render('Theme/AuthInner/Error/Offlinepage');
    }

    // Landing

    public function landing()
    {
        return Inertia::render('Theme/Landing/OnePage/index');
    }

    public function nft_landing()
    {
        return Inertia::render('Theme/Landing/NFTLanding/index');
    }

    public function job_landing()
    {
        return Inertia::render('Theme/Landing/Job_Landing/index');
    }

    public function profile()
    {
        return Inertia::render('Theme/Auth/user-profile');
    }
}
