import React, { useState, useCallback, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import { format } from 'timeago.js'
import { debounce } from '../constants'

export default function Comments({ commentArr }) {
  const aliasRef = useRef(null)
  const contentRef = useRef(null)
  const hiddenRef = useRef(null)
  const [aliasError, setAliasError] = useState(false)
  const [contentError, setContentError] = useState(false)

  function addComment() {
    let valid = true
    if (aliasRef.current.value.length > 29 || !aliasRef.current.value.length) {
      setAliasError(true)
      valid = false
    }
    if (contentRef.current.value.length > 40 || !contentRef.current.value.length) {
      setContentError(true)
      valid = false
    }
    if (hiddenRef.current.value.length) {
      valid = false
    }

    if (valid) { //submit comment
      console.log('alias =', aliasRef.current.value)
      console.log('content =', contentRef.current.value)
    }
  }

  // performant validation check
  const handleContent = useCallback(
		debounce(e => {
      if (e.target.id === 'c-alias') {
        if (e.target.value.length > 29) {
          setAliasError(true)
        } else {
          setAliasError(false)
        }
      } else if (e.target.id === 'c-content') {
        if (e.target.value.length > 45) {
          setContentError(true)
        } else {
          setContentError(false)
        }
      }
    }, 1000), [] // will be created only once initially
  )

  return (
    <>
      <Accordion className="" defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Comments
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0" className="expandable p-2">
            <>
              {commentArr && commentArr.map(comment => (
                <div key={comment.comment_id}>
                  <Row className="my-4">
                    <Col md={1}>
                      <div style={{width: '60px'}}>
                        <img src="https://www.placecage.com/60/60" className="rounded-circle" /> 
                        {/* {comment.avatar} */}
                      </div>
                    </Col>
                    <Col md={10} className="ml-1">
                      <Card>
                        <Card.Body>
                          <Card.Title>{comment.alias}</Card.Title>
                          <Card.Text>
                            {comment.content}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Created: {format(comment.created)} | Updated: {format(comment.updated)}</Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                </div>
              ))}
              <h1>Add a comment</h1>
              <Form>
                <Form.Label>Alias</Form.Label>
                <Form.Control type="text" ref={aliasRef} id="c-alias" onChange={handleContent} placeholder="Nickname" />
                {/* 30 char limit */}
                <Form.Label className="mt-4">Content</Form.Label>
                {/* 3000 char limit */}
                <Form.Control as="textarea" ref={contentRef} rows={3} id="c-content" onChange={handleContent} placeholder="Enter your comment here" />
                <input ref={hiddenRef} type="hidden" />
                {aliasError && <p className="text-center text-danger mx-auto">Please include an alias under 30 characters</p>}
                {contentError && <p className="text-center text-danger mx-auto">Please include a comment under 3000 characters</p>}
                <Row>
                  <Button className="mx-auto" disabled={aliasError || contentError} onClick={addComment}>Add Comment</Button>
                </Row>
              </Form>
            </>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      
    </>
  )
}