import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
// const Appointments = () => import('@/views/Appointments')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Admins
const Admins = () => import('@/views/app/admins/Admins')
const Admin = () => import('@/views/app/admins/Admin')
const EditAdmin = () => import('@/views/app/admins/EditAdmin')
const CreateAdmin = () => import('@/views/app/admins/CreateAdmin')

// Doctors
const Doctors = () => import('@/views/app/doctors/Doctors')
const Doctor = () => import('@/views/app/doctors/Doctor')
const EditDoctor = () => import('@/views/app/doctors/EditDoctor')
const CreateDoctor = () => import('@/views/app/doctors/CreateDoctor')

// CallCenters
const CallCenters = () => import('@/views/app/callCenters/CallCenters')
const CallCenter = () => import('@/views/app/callCenters/CallCenter')
const EditCallCenter = () => import('@/views/app/callCenters/EditCallCenter')
const CreateCallCenter = () => import('@/views/app/callCenters/CreateCallCenter')

// Clinics
const Clinics = () => import('@/views/app/clinics/Clinics')
const Clinic = () => import('@/views/app/clinics/Clinic')
const EditClinic = () => import('@/views/app/clinics/EditClinic')
const CreateClinic = () => import('@/views/app/clinics/CreateClinic')

// Specialists
const Specialists = () => import('@/views/app/specialists/Specialists')
const Specialist = () => import('@/views/app/specialists/Specialist')
const EditSpecialist = () => import('@/views/app/specialists/EditSpecialist')
const CreateSpecialist = () => import('@/views/app/specialists/CreateSpecialist')

// Locations
const Locations = () => import('@/views/app/locations/Locations')
const Location = () => import('@/views/app/locations/Location')
const EditLocation = () => import('@/views/app/locations/EditLocation')
const CreateLocation = () => import('@/views/app/locations/CreateLocation')

// appointments
const Appointments = () => import('@/views/app/appointments/Appointments')
const Appointment = () => import('@/views/app/appointments/Appointment')
const EditAppointment = () => import('@/views/app/appointments/EditAppointment')
const CreateAppointment = () => import('@/views/app/appointments/CreateAppointment')

//Notes
const Notes = () => import('@/views/notes/Notes')
const Note = () => import('@/views/notes/Note')
const EditNote = () => import('@/views/notes/EditNote')
const CreateNote = () => import('@/views/notes/CreateNote')

//Roles
const Roles = () => import('@/views/roles/Roles')
const Role = () => import('@/views/roles/Role')
const EditRole = () => import('@/views/roles/EditRole')
const CreateRole = () => import('@/views/roles/CreateRole')

//Bread
const Breads = () => import('@/views/bread/Breads')
const Bread = () => import('@/views/bread/Bread')
const EditBread = () => import('@/views/bread/EditBread')
const CreateBread = () => import('@/views/bread/CreateBread')
const DeleteBread = () => import('@/views/bread/DeleteBread')

//Resources
const Resources = () => import('@/views/resources/Resources')
const CreateResource = () => import('@/views/resources/CreateResources')
const Resource = () => import('@/views/resources/Resource')
const EditResource = () => import('@/views/resources/EditResource')
const DeleteResource = () => import('@/views/resources/DeleteResource')

//Email
const Emails        = () => import('@/views/email/Emails')
const CreateEmail   = () => import('@/views/email/CreateEmail')
const EditEmail     = () => import('@/views/email/EditEmail')
const ShowEmail     = () => import('@/views/email/ShowEmail')
const SendEmail     = () => import('@/views/email/SendEmail')

const Menus       = () => import('@/views/menu/MenuIndex')
const CreateMenu  = () => import('@/views/menu/CreateMenu')
const EditMenu    = () => import('@/views/menu/EditMenu')
const DeleteMenu  = () => import('@/views/menu/DeleteMenu')

const MenuElements = () => import('@/views/menuElements/ElementsIndex')
const CreateMenuElement = () => import('@/views/menuElements/CreateMenuElement')
const EditMenuElement = () => import('@/views/menuElements/EditMenuElement')
const ShowMenuElement = () => import('@/views/menuElements/ShowMenuElement')
const DeleteMenuElement = () => import('@/views/menuElements/DeleteMenuElement')

const Media = () => import('@/views/media/Media')


Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


router.beforeEach((to, from, next) => {
  let roles = localStorage.getItem("roles");
  if(roles != null){
    roles = roles.split(',')
  }
  if(to.matched.some(record => record.meta.requiresAdmin)) {
    if(roles != null && roles.indexOf('admin') >= 0 ){
      next()
    }else{
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
  // }else if(to.matched.some(record => record.meta.requiresAdmin)) {
  //   if(roles != null && roles.indexOf('collCenter') >= 0 ){
  //     next()
  //   }else{
  //     next({
  //       path: '/login',
  //       params: { nextUrl: to.fullPath }
  //     })
  //   }
  }else{
    next()
  }
})

export default router

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/appointments',
      name: 'Home',
      component: TheContainer,
      meta:{
        requiresAdmin: true
      },
      children: [
        {
          path: 'media',
          name: 'Media',
          component: Media,
          meta:{
            requiresAdmin: true
          }
        },
        {
          path: 'appointments',
          name: 'Appointments',
          component: Appointments
        },
        {
          path: 'colors',
          name: 'Colors',
          component: Colors,
          meta:{
            requiresAdmin: true
          }
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
          meta:{
            requiresAdmin: true
          }
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts,
          meta:{
            requiresAdmin: true
          }
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets,
          meta:{
            requiresAdmin: true
          }
        },
        {
          path: 'menu',
          meta: { label: 'Menu'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Menus,
              
            },
            {
              path: 'create',
              meta: { label: 'Create Menu' },
              name: 'CreateMenu',
              component: CreateMenu,
              
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Menu' },
              name: 'EditMenu',
              component: EditMenu,
              
            },
            {
              path: ':id/delete',
              meta: { label: 'Delete Menu' },
              name: 'DeleteMenu',
              component: DeleteMenu,
              
            },
          ]
        },
        {
          path: 'menuelement',
          meta: { label: 'MenuElement'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: ':menu/menuelement',
              component: MenuElements,
              
            },
            {
              path: ':menu/menuelement/create',
              meta: { label: 'Create Menu Element' },
              name: 'Create Menu Element',
              component: CreateMenuElement,
              
            },
            {
              path: ':menu/menuelement/:id',
              meta: { label: 'Menu Element Details'},
              name: 'Menu Element',
              component: ShowMenuElement,
              
            },
            {
              path: ':menu/menuelement/:id/edit',
              meta: { label: 'Edit Menu Element' },
              name: 'Edit Menu Element',
              component: EditMenuElement,
              
            },
            {
              path: ':menu/menuelement/:id/delete',
              meta: { label: 'Delete Menu Element' },
              name: 'Delete Menu Element',
              component: DeleteMenuElement,
              
            },
          ]
        },
        // Admins route - directory
        {
          path: 'admins',
          meta: { label: 'Admins'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Admins,
              
            },
            {
              path: ':create',
              meta: { label: 'Create Admin' },
              name: 'Create Admin',
              component: CreateAdmin,
              
            },
            {
              path: ':id',
              meta: { label: 'Admin Details'},
              name: 'Admin',
              component: Admin,
              
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Admin' },
              name: 'Edit Admin',
              component: EditAdmin,
              
            },
          ]
        },
        // callCenters route - directory
        {
          path: 'callCenters',
          meta: { label: 'CallCenters'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: CallCenters,
            },
            {
              path: ':create',
              meta: { label: 'Create CallCenter' },
              name: 'Create CallCenter',
              component: CreateCallCenter,
              
            },
            {
              path: ':id',
              meta: { label: 'CallCenter Details'},
              name: 'CallCenter',
              component: CallCenter,
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit CallCenter' },
              name: 'Edit CallCenter',
              component: EditCallCenter,
            },
          ]
        },
        // Doctors route - directory
        {
          path: 'doctors',
          meta: { label: 'Doctors'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Doctors,
            },
            {
              path: ':create',
              meta: { label: 'Create Doctor' },
              name: 'Create Doctor',
              component: CreateDoctor,
              
            },
            {
              path: ':id/show',
              meta: { label: 'Doctor Details'},
              name: 'Doctor',
              component: Doctor,
              // meta:{
                //   requiresAdmin: true
              // }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Doctor' },
              name: 'Edit Doctors',
              component: EditDoctor,
              
            },
          ]
        },
        
        // Clinics route - directory
        {
          path: 'clinics',
          meta: { label: 'Clinics'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Clinics,
            },
            {
              path: ':create',
              meta: { label: 'Create Clinic' },
              name: 'Create Clinic',
              component: CreateClinic,
              
            },
            {
              path: ':id',
              meta: { label: 'Clinic Details'},
              name: 'Clinic',
              component: Clinic,
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Clinic' },
              name: 'Edit Clinic',
              component: EditClinic,
            },
          ]
        },

        // Specialists route - directory
        {
          path: 'specialists',
          meta: { label: 'Specialists'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Specialists,
              
            },
            {
              path: 'create',
              meta: { label: 'Create Specialist' },
              name: 'Create Specialist',
              component: CreateSpecialist,
              
            },
            {
              path: ':id',
              meta: { label: 'Specialist Details'},
              name: 'Specialist',
              component: Specialist,
              
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Specialist' },
              name: 'Edit Specialist',
              component: EditSpecialist,
              
            },
          ]
        },

        //Appointments route - directory
        {
          path: 'appointments',
          meta: { label: 'Appointments'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Appointments,
              
            },
            {
              path: ':create',
              meta: { label: 'Create Appointment' },
              name: 'Create Appointment',
              component: CreateAppointment,
              
            },
            {
              path: ':id',
              meta: { label: 'Appointment Details'},
              name: 'Appointment',
              component: Appointment,
              
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Appointment' },
              name: 'Edit Appointment',
              component: EditAppointment,
              
            },
          ]
        },
        //Locations route - directory
        {
          path: 'locations',
          meta: { label: 'Locations'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Locations,
              
            },
            {
              path: ':create',
              meta: { label: 'Create Location' },
              name: 'Create Location',
              component: CreateLocation,
              
            },
            {
              path: ':id',
              meta: { label: 'Location Details'},
              name: 'Location',
              component: Location,
              
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Location' },
              name: 'Edit Location',
              component: EditLocation,
            },
          ]
        },

        {
          path: 'notes',
          meta: { label: 'Notes'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Notes,
            },
            {
              path: 'create',
              meta: { label: 'Create Note' },
              name: 'Create Note',
              component: CreateNote,
            },
            {
              path: ':id',
              meta: { label: 'Note Details'},
              name: 'Note',
              component: Note,
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Note' },
              name: 'Edit Note',
              component: EditNote,
            },
          ]
        },
        // Roles route - directory
        {
          path: 'roles',
          meta: { label: 'Roles'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Roles,
              
            },
            {
              path: 'create',
              meta: { label: 'Create Role' },
              name: 'Create Role',
              component: CreateRole,
            },
            {
              path: ':id',
              meta: { label: 'Role Details'},
              name: 'Role',
              component: Role,
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Role' },
              name: 'Edit Role',
              component: EditRole,
            },
          ]
        },
        {
          path: 'bread',
          meta: { label: 'Bread'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Breads,
            },
            {
              path: 'create',
              meta: { label: 'Create Bread' },
              name: 'CreateBread',
              component: CreateBread,     
            },
            {
              path: ':id',
              meta: { label: 'Bread Details'},
              name: 'Bread',
              component: Bread,
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Bread' },
              name: 'Edit Bread',
              component: EditBread,
            },
            {
              path: ':id/delete',
              meta: { label: 'Delete Bread' },
              name: 'Delete Bread',
              component: DeleteBread,
            },
          ]
        },
        {
          path: 'email',
          meta: { label: 'Emails'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Emails,
            },
            {
              path: 'create',
              meta: { label: 'Create Email Template' },
              name: 'Create Email Template',
              component: CreateEmail,
            },
            {
              path: ':id',
              meta: { label: 'Show Email Template'},
              name: 'Show Email Tempalte',
              component: ShowEmail,
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Email Tempalate' },
              name: 'Edit Email Template',
              component: EditEmail,
            },
            {
              path: ':id/sendEmail',
              meta: { label: 'Send Email' },
              name: 'Send Email',
              component: SendEmail,
            },
          ]
        },
        {
          path: 'resource',
          meta: { label: 'Resources'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: ':bread/resource',
              component: Resources,
            },
            {
              path: ':bread/resource/create',
              meta: { label: 'Create Resource' },
              name: 'CreateResource',
              component: CreateResource
            },
            {
              path: ':bread/resource/:id',
              meta: { label: 'Resource Details'},
              name: 'Resource',
              component: Resource,
            },
            {
              path: ':bread/resource/:id/edit',
              meta: { label: 'Edit Resource' },
              name: 'Edit Resource',
              component: EditResource
            },
            {
              path: ':bread/resource/:id/delete',
              meta: { label: 'Delete Resource' },
              name: 'Delete Resource',
              component: DeleteResource
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards,
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms,
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches,
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables,
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs,
            },
            {
              path: 'breadcrumb',
              name: 'Breadcrumb',
              component: Breadcrumbs,
            },
            {
              path: 'carousel',
              name: 'Carousel',
              component: Carousels,
            },
            {
              path: 'collapse',
              name: 'Collapse',
              component: Collapses,
            },
            {
              path: 'jumbotron',
              name: 'Jumbotron',
              component: Jumbotrons,
            },
            {
              path: 'list-group',
              name: 'List Group',
              component: ListGroups,
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs,
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars,
            },
            {
              path: 'pagination',
              name: 'Pagination',
              component: Paginations,
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers,
            },
            {
              path: 'progress',
              name: 'Progress',
              component: ProgressBars,
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips,
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'buttons',
              name: 'Standard Buttons',
              component: StandardButtons,
            },
            {
              path: 'button-group',
              name: 'Button Group',
              component: ButtonGroups,
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns,
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons,
            }
          ]
        },
        {
          path: 'icon',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons,
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands,
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags,
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts,
            },
            {
              path: 'badge',
              name: 'Badge',
              component: Badges,
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals,
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login // only trick method to show create appiontment page the correct component is Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
}
