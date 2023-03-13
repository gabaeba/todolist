import { Button, Checkbox, Col, Form, Input, Radio, Row, Typography } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react';
import { useCreateTaskMutation } from './pages/task/graphql/__generated__/create.gql.generated';
import { useDeleteTaskMutation } from './pages/task/graphql/__generated__/delete.gql.generated';
import { GetTaskDocument, useGetTaskQuery } from './pages/task/graphql/__generated__/list.gql.generated'
import { useUpdateTaskMutation } from './pages/task/graphql/__generated__/update.gql.generated';

function App(): JSX.Element {
  const [form] = useForm();
  const { data, loading } = useGetTaskQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })
  const [, setValues] = useState()
  const [createTask, { loading: loadingCreate }] = useCreateTaskMutation({
    refetchQueries: [GetTaskDocument],
    awaitRefetchQueries: true
  })
  const [updateTask, { loading: loadingUpdate }] = useUpdateTaskMutation({
    refetchQueries: [GetTaskDocument]
  })
  const [deleteTask, { loading: loadingDelete }] = useDeleteTaskMutation({
    refetchQueries: [GetTaskDocument]
  })

  const onFinish = async () => {
    await createTask({ variables: { data: { description: form.getFieldValue('description') } } })
  }

  useEffect(() => {
    if (!data) return
    form.setFieldsValue({
      createTasks: data?.tasks.map((task) => {
        return {
          id: task.id,
          description: task.description,
          isCompleted: task.isCompleted
        }
      })
    })
    form.resetFields()
  }, [data, loading, loadingCreate, loadingUpdate, loadingDelete])

  if (loading || loadingCreate || loadingUpdate || loadingDelete) return <p>Loading...</p>

  return (
    <Form
      style={{ paddingTop: '20px' }}
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={{
        createTasks: data?.tasks.map((task) => {
          return {
            id: task.id,
            description: task.description,
            isCompleted: task.isCompleted
          }
        })
      }}
      onValuesChange={(changedValues, allValues) => {
        setValues(allValues)
      }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography.Title level={3} style={{ textAlign: 'center', paddingBottom: '20px' }}>
          Lista de tarefas
        </Typography.Title>
        <Row gutter={[16, 16]} align='middle'>
          <Col>
            <Form.Item name={'description'} label={"Descrição"} rules={[{ required: true, message: 'Descrição obrigatória' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              +
            </Button>
          </Col>
        </Row>
        <Form.List name="createTasks">
          {(fields, { add, remove }) => (
            <>
              <div>
                {fields.map(({ key, name }) => (
                  <Row key={name} gutter={[16, 16]} align='bottom'>
                    <Col>
                      <Form.Item name={[name, 'id']} hidden>
                        <Input hidden />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name={[name, 'isCompleted']} valuePropName="checked">
                        <Checkbox onChange={async (event) => {
                          const { checked } = event?.target
                          await updateTask({
                            variables: { data: { isCompleted: { set: checked } }, where: { id: form.getFieldValue(['createTasks', name, 'id']) } }
                          })

                        }} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name={[name, 'description']}>
                        <Input bordered={false} readOnly style={form.getFieldValue(['createTasks', name, 'isCompleted']) ? { textDecoration: "line-through" } : {}} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        <Button
                          danger
                          size='small'
                          onClick={async () => {
                            await deleteTask({ variables: { where: { id: form.getFieldValue(['createTasks', name, 'id']) } } })
                          }}
                        >
                          x
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </div>
            </>
          )}
        </Form.List>
      </div>
    </Form >
  )
}

export default App
