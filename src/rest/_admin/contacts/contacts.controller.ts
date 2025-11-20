import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminContactsService } from './contacts.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ADMIN | CONTACTS')
@Controller('admin/contacts')
export class AdminContactsController {
  constructor(private readonly contactsService: AdminContactsService) {}

  // Tabs
  @Get('tabs')
  getTabs() {
    return this.contactsService.getTabs()
  }

  @Post('tabs')
  createTab(@Body() dto: any) {
    return this.contactsService.createTab(dto)
  }

  @Patch('tabs/:id')
  updateTab(@Param('id') id: number, @Body() dto: any) {
    return this.contactsService.updateTab(id, dto)
  }

  @Delete('tabs/:id')
  deleteTab(@Param('id') id: number) {
    return this.contactsService.deleteTab(id)
  }

  // Departments
  @Get('departments/tab/:tabId')
  getDepartmentsByTabId(@Param('tabId') tabId: number) {
    return this.contactsService.getDepartmentsByTabId(tabId)
  }

  @Post('departments')
  createDepartment(@Body() dto: any) {
    return this.contactsService.createDepartment(dto)
  }

  @Patch('departments/:id')
  updateDepartment(@Param('id') id: number, @Body() dto: any) {
    return this.contactsService.updateDepartment(id, dto)
  }

  @Delete('departments/:id')
  deleteDepartment(@Param('id') id: number) {
    return this.contactsService.deleteDepartment(id)
  }

  // Subdepartments
  @Get('subdepartments/department/:departmentId')
  getSubdepartmentsByDepartmentId(@Param('departmentId') departmentId: number) {
    return this.contactsService.getSubdepartmentsByDepartmentId(departmentId)
  }

  @Post('subdepartments')
  createSubdepartment(@Body() dto: any) {
    return this.contactsService.createSubdepartment(dto)
  }

  @Patch('subdepartments/:id')
  updateSubdepartment(@Param('id') id: number, @Body() dto: any) {
    return this.contactsService.updateSubdepartment(id, dto)
  }

  @Delete('subdepartments/:id')
  deleteSubdepartment(@Param('id') id: number) {
    return this.contactsService.deleteSubdepartment(id)
  }
}