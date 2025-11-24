import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminContactsService } from './contacts.service'
import { IPagination, ReqPagination } from 'src/shared'
import { RoleGuard } from 'src/domain/sessions/decorators'
import { UserRole } from 'src/domain/users/typing'

@Controller('admin/contacts')
export class AdminContactsController {
  constructor(private readonly contactsService: AdminContactsService) {}

  // Tabs
  @RoleGuard(UserRole.Admin)
  @Get('tabs')
  getList(@ReqPagination() pagination: IPagination) {
    return this.contactsService.getTabs(pagination)
  }

  @RoleGuard(UserRole.Admin)
  @Post('tabs')
  createTab(@Body() dto: any) {
    return this.contactsService.createTab(dto)
  }

  @RoleGuard(UserRole.Admin)
  @Patch('tabs/:id')
  updateTab(@Param('id') id: number, @Body() dto: any) {
    return this.contactsService.updateTab(id, dto)
  }

  @RoleGuard(UserRole.Admin)
  @Delete('tabs/:id')
  deleteTab(@Param('id') id: number) {
    return this.contactsService.deleteTab(id)
  }

  // Departments
  @RoleGuard(UserRole.Admin)
  @Get('departments/tab/:tabId')
  getDepartmentsByTabId(@Param('tabId') tabId: number) {
    return this.contactsService.getDepartmentsByTabId(tabId)
  }

  @RoleGuard(UserRole.Admin)
  @Post('departments')
  createDepartment(@Body() dto: any) {
    return this.contactsService.createDepartment(dto)
  }

  @RoleGuard(UserRole.Admin)
  @Patch('departments/:id')
  updateDepartment(@Param('id') id: number, @Body() dto: any) {
    return this.contactsService.updateDepartment(id, dto)
  }

  @RoleGuard(UserRole.Admin)
  @Delete('departments/:id')
  deleteDepartment(@Param('id') id: number) {
    return this.contactsService.deleteDepartment(id)
  }

  // Subdepartments
  @RoleGuard(UserRole.Admin)
  @Get('subdepartments/department/:departmentId')
  getSubdepartmentsByDepartmentId(@Param('departmentId') departmentId: number) {
    return this.contactsService.getSubdepartmentsByDepartmentId(departmentId)
  }

  @RoleGuard(UserRole.Admin)
  @Post('subdepartments')
  createSubdepartment(@Body() dto: any) {
    return this.contactsService.createSubdepartment(dto)
  }

  @RoleGuard(UserRole.Admin)
  @Patch('subdepartments/:id')
  updateSubdepartment(@Param('id') id: number, @Body() dto: any) {
    return this.contactsService.updateSubdepartment(id, dto)
  }

  @RoleGuard(UserRole.Admin)
  @Delete('subdepartments/:id')
  deleteSubdepartment(@Param('id') id: number) {
    return this.contactsService.deleteSubdepartment(id)
  }
}